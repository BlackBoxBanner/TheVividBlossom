import {NextApiRequest, NextApiResponse} from "next";
import {userGetAddress, userGetPayment} from "@/hook/api/user";

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

  const {method, body, query} = req;

  switch (method) {
    case "GET":
      try {

        const productRes = await prisma?.product.findMany({
            select: {
              id: true,
              title: true,
              description: true,
              selling_price: true,
              status: true,
              Product_Image: {}
            }
          }
        )

        return res.status(200).json(productRes)
      } catch
        (e) {
        res.status(400).send(e)
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}