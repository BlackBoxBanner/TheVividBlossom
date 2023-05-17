import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

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

  const imageData = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      UserImage: {
        select: {
          image: true
        }
      }
    }
  })

  const image = imageData?.UserImage[0].image! || null

  res.status(200).json({image});
}

