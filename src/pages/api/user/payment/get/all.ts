import {NextApiRequest, NextApiResponse} from "next";
import {userGetAddress, userGetPayment} from "@/hook/api/user";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id: string
  };
  body: {};
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
    case "GET":
      try {
        const payment = await userGetPayment({id: query.id})

        return res.status(200).json({
          payment: payment?.User_Payment,
          default: payment?.DefaultPayment?.paymentId
        })
      } catch (e) {
        res.status(400).send(e)
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}