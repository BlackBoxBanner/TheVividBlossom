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
      await prisma?.address.findUnique({
        where: {
          id: addressId,
        }
      }).then(e => {
        return res.status(200).json({address: e})
      }).catch(e => {
        return res.status(400).json(e)
      })
    }

    await userGetAddress({id}).then(e => {
      return res.status(200).json({
        user: {
          name: `${e?.first_name} ${e?.last_name}`,
          tel: e?.telephone,
        },
        address: e?.Address,
        default: e?.DefaultAddress?.addressId
      });
    }).catch(e => {
      return res.status(400).json(e)
    })
  }

  async function postHandler() {
    const data = req.body

    await prisma?.address.create({
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
    }).then(e => {
      return res.status(200).send(e)
    }).catch(e => res.status(400).json(e))
  }

  async function patchHandler() {
    const data = req.body

    if (data.type === "default") {
      await prisma?.user.update({
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
      }).then(e => {
        return res.status(200).send(e)
      }).catch(e => res.status(400).json(e))
    }

    await prisma?.address.update({
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
    }).then(e => {
      return res.status(200).send(e)
    }).catch(e => res.status(400).json(e))
  }

  async function deleteHandler() {
    const {addressId} = req.body

    await prisma?.address.delete({
      where: {
        id: addressId
      }
    }).then((e) => {
      res.status(200).json({status: "Deleted"})
    }).catch(e => res.status(400).json(e))

  }
}


