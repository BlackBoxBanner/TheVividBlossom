import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id?: string
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
  const {id} = req.query

  if (!id) return res.status(204).send("no id")

  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!user) return res.status(204)

  res.status(200).json({user});
}

