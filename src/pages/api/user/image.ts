import {NextApiRequest, NextApiResponse} from "next";
import {getImage} from "@/hook/api/image";

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

  if (!email) return res.status(400).send("No email provided!");

  const image = await getImage(email)

  if (!image) return res.status(200)

  res.status(200).json({image});
}

