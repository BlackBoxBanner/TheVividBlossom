import {NextApiRequest, NextApiResponse} from "next";
import {updateImage} from "@/hook/api/image";

interface ExtendedNextApiRequest extends NextApiRequest {
  // query: {
  //   email?: string
  // };
  body: {
    email: string,
    image: string
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return res.status(404).send("Not found!")
  const {email, image} = req.body

  if (!email) return res.status(404).send("No email provided!");
  // if (!image) return res.status(404).send("No image provided!");

  await updateImage({image: image, email})

  res.status(200).json({status: "done"});
}

