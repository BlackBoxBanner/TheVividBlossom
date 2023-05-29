import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {};
  body: {
    userId: string
    productId: string
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
        const product = await prisma?.user.update({
          where: {
            id: body.userId
          },
          data: {
            MyBasket: {
              create: {
                productId: body.productId
              }
            }
          }
        })

        return res.status(200).json(product)
      } catch (e) {
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