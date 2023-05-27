import {NextApiRequest, NextApiResponse} from "next";
import {userGetAddress, userGetPayment} from "@/hook/api/user";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id: string
  };
  // body: {
  // 	id: string
  // };
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

  if (req.method !== "GET") return res.status(404).send("Not found!")
  const {id} = req.query

  console.log(id)

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


