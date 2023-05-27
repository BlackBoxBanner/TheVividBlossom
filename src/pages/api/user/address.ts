import {NextApiRequest, NextApiResponse} from "next";
import {userGetAddress} from "@/hook/api/user";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id: string
    addressId?: string
  };
  body: {
    type?: string
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

  switch (req.method) {
    case "GET":
      await getHandler();
      break
    case "POST":
      await postHandler()
      break
    case "PATCH":
      await patchHandler()
      break
    case "DELETE":
      await deleteHandler()
      break
    default:
      res.status(404).json({error: "Not found!"})

  }

  async function getHandler() {
    const {id, addressId} = req.query

    if (addressId) {
      const address = await prisma?.address.findUnique({
        where: {
          id: addressId,
        }
      })
      if (!address) return res.status(400).json({message: "Error"})
      return res.status(200).json(address)
    }

    const address = await userGetAddress({id})

    if (!address) return res.status(400).json({message: "Error"})
    return res.status(200).json({
      user: {
        name: `${address?.first_name} ${address?.last_name}`,
        tel: address?.telephone,
      },
      address: address?.Address,
      default: address?.DefaultAddress?.addressId
    })
  }

  async function postHandler() {
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

  async function patchHandler() {
    const data = req.body

    if (data.type === "default") {
      const address = await prisma?.user.update({
        where: {
          id: data.userid
        },
        data: {
          DefaultAddress: {
            update: {
              addressId: data.addressId
            }
          }
        }
      })

      if (!address) return res.status(400).json({message: "Error"})
      return res.status(200).json(address)
    }

    const address = await prisma?.address.update({
      where: {
        id: data.addressId,
      },
      data: {
        user_id: data.userid,
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        subDistrict: data.subDistrict,
        district: data.district,
        province: data.province,
        zipcode: data.zipcode,
        modified_at: new Date()
      }
    })

    if (!address) return res.status(400).json({message: "Error"})
    return res.status(200).json(address)
  }

  async function deleteHandler() {
    const {addressId} = req.body

    const address = await prisma?.address.delete({
      where: {
        id: addressId
      }
    })

    if (!address) return res.status(400).json({message: "Error"})
    return res.status(200).json(address)
  }
}


