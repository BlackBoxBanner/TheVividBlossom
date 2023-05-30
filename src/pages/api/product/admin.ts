import {NextApiRequest, NextApiResponse} from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    // id: string
  };
  body: {};
}

export default async function getAllProductHandler(
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
        console.log("feteching")
        const productRes = await prisma?.product.findMany({})

        return res.status(200).json(productRes)
      } catch
        (e) {
        res.status(400).send(e)
        console.log(e);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}