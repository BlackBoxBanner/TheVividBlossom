import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {};
  body: {
    userid: string
    addressId: string
    address_line1: string
    address_line2: string
    subDistrict: string
    district: string
    province: string
    zipcode: string
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
        const address = await prisma?.address.update({
          where: {
            id: body.addressId,
          },
          data: {
            user_id: body.userid,
            address_line1: body.address_line1,
            address_line2: body.address_line2,
            subDistrict: body.subDistrict,
            district: body.district,
            province: body.province,
            zipcode: body.zipcode,
            modified_at: new Date()
          }
        })

        return res.status(200).json(address)
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