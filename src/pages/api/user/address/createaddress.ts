import {NextApiRequest, NextApiResponse} from "next";

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

  if (req.method !== "POST") return res.status(405).json({message: "Error"});

  const data = req.body

  const address = await prisma?.address.create({
    data: {
      user_id: data.userid,
      address_line1: data.address_line1,
      address_line2: data.address_line2,
      subDistrict: data.subDistrict,
      district: data.district,
      province: data.province,
      zipcode: data.zipcode,
      create_at: new Date(),
    },
  })

  if (!address) return res.status(400).json({message: "Error"})
  return res.status(200).json(address)
}