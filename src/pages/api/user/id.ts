import {NextApiRequest, NextApiResponse} from "next";
import {getId} from "@/hook/api/user";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    email?: string
  };
  // body: {
  // 	id: string
  // };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(404).send("Not found!")
  const {email} = req.query

  if (!email) return res.status(204)
  console.log(email)

  const idPrommis = await getId(email)

  if (!idPrommis?.id) return res.status(204)

  res.status(200).json({id: idPrommis.id});
}