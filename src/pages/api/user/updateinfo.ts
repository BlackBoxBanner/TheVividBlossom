import {NextApiRequest, NextApiResponse} from "next";
import {userUpdateApi, userUpdateProps} from "@/hook/api/user";
import prisma from "@/lib/prisma";

export interface PostType extends userUpdateProps {

}

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {};
  body: PostType
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {

  switch (req.method) {
    case "PATCH":
      await patchMethod()
      break
    default:
      res.status(200).send(`This api is use with POST method only!`)
      break
  }

  async function patchMethod() {

    if (
      req.headers.authorization != `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
    ) {
      return res.status(401).send("un-authorization")
    }

    const props = req.body

    try {
      await prisma.user.update({
        where: {
          id: props.id,
        },
        data: {
          first_name: props.first_name,
          last_name: props.last_name,
          telephone: props.telephone,
          dob: new Date(String(props.dob).split(" / ").reverse().join("-")).toISOString(),
        }
      })
    } catch (e) {
      console.log(e)
      res.status(400).send(e)
    }

    res.status(200).send("User updated")
  }
}

