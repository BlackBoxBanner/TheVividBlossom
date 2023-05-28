import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {};
  body: {
    paymentId: string
    name_on_card: string
    card_number: string
    card_expiry: string
    cvv: string
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

        const [monthStr, yearStr] = body.card_expiry.split(" / ");
        const date = new Date(Number(`20${yearStr}`), Number(monthStr) - 1);

        const payment = await prisma?.user_Payment.update({
          where: {
            id: body.paymentId
          },
          data: {
            name_on_card: body.name_on_card,
            card_number: body.card_number,
            card_expiry: date,
            cvv: body.cvv,
            modified_at: new Date()
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