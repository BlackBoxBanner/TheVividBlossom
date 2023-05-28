import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {};
  body: {
    paymentId: string
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (
    req.headers.authorization != `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
  ) {
    return res.status(401).send("un-authorization")
  }

  const {method, body, query} = req;

  switch (method) {
    case "POST":
      try {
        const payment = await prisma?.user_Payment.delete({
          where: {
            id: body.paymentId
          }
        })

        return res.status(200).json(payment)
      } catch (e) {
        console.log(e)
        res.status(400).send(e)
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}