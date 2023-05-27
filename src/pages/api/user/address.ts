import {NextApiRequest, NextApiResponse} from "next";
import {userGetAddress, userGetPayment} from "@/hook/api/user";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id: string
  };
  body: {
    userid: string
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

  if (req.method === "GET") {
    const {id} = req.query

    const data = await userGetAddress({id})


    res.status(200).json({
      user: {
        name: `${data?.first_name} ${data?.last_name}`,
        tel: data?.telephone,
      },
      address: data?.Address,
      default: data?.DefaultAddress?.addressId
    });
  }
  if (req.method === "POST") {
    const data = req.body
    console.log(data);

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

    res.status(200).send(address)
  }

  return res.status(404).send("Not found!")
}


