import {NextApiRequest, NextApiResponse} from "next";
import {userGetPayment} from "@/hook/api/user";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id: string
  };
  // body: {
  // 	id: string
  // };
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

  if (req.method !== "GET") return res.status(404).send("Not found!")
  const {id} = req.query

  console.log(id)

  const payment = await userGetPayment({id})


  res.status(200).json({
    payment: payment?.User_Payment,
    default: payment?.DefaultPayment?.paymentId
  });
}


