import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
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

  const imageId = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      imageId: true
    }
  })


  if (!imageId?.imageId) return res.status(200).send("imageId not found!")

  const image = await getImage(imageId.imageId)
  if (!image) return res.status(404).send("User not found!")

  res.status(200).json({image});
}

