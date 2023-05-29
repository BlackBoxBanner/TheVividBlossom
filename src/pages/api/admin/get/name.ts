import {NextApiRequest, NextApiResponse} from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id: string
  };
  body: {};
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
    case "GET":
      try {
        const adminName = await prisma?.admin_User.findUnique({
          where: {
            id: query.id
          }
        })

        return res.status(200).json(adminName)
      } catch (e) {
        console.log(e)
        res.status(400).send(e)
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}