import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
import {compare, hash} from "bcrypt";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {};
  body: {
    id: string
    email: string
    dPassword: string
    cPassword: string
    nPassword: string
    cfPassword: string
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

        if (body.cfPassword !== body.nPassword) {
          return res.status(400).json({Error: "Password not matched."})
        }

        if (!await compare(body.cPassword, body.dPassword)) {
          res.status(400).json({Error: "Password not matched."})
        }

        const user = await prisma.user.update({
          where: {
            id: body.id
          },
          data: {
            password: await hash(body.cfPassword, 10)
          }
        })

        return res.status(200).json(user)
      } catch
        (e) {
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