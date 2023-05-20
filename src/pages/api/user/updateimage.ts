import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
import {breakImage} from "@/hook/image";
import {updateImage} from "@/hook/api/image";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    email?: string
  };
  body: {
    email: string,
    image: string
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404).send("Not found!")
  const {email, image} = req.body

  if (!email) return res.status(404).send("No email provided!");
  if (!image) return res.status(404).send("No image provided!");

  const user = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      imageId: true
    }
  })

  if (!user?.imageId) return res.status(404).send("No user found!");

  const imageUpdate = await updateImage({image: image, imageId: user.imageId})

  console.log(imageUpdate)

  res.status(200).json({status: "done"});
}
