import {NextApiRequest, NextApiResponse} from "next";
import {userGetPayment} from "@/hook/api/user";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id: string
  };
  body: {
    id: string
    paymentId?: string
    type?: string
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
      await getHandler(req, res)
      break
    case "DELETE":
      await deleteHandler(req, res)
      break
    case "PATCH":
      await patchHandler(req, res)
    default:
      res.status(404).send("Not found!")
      break
  }
}

async function getHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const {id} = req.query
  await userGetPayment({id}).then(e => {
    return res.status(200).json({
      payment: e?.User_Payment,
      default: e?.DefaultPayment?.paymentId
    });
  }).catch(e => res.status(400).json(e))
}

async function deleteHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const {paymentId} = req.body
  await prisma?.user_Payment.delete({
    where: {
      id: paymentId
    }
  }).then(e => {
    return res.status(200).json(e)
  }).catch(e => res.status(400).json(e))
}

async function patchHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const {paymentId, type, id} = req.body
  switch (type) {
    case "default":
      await updateDefault().then()
      break
    default:
      break
  }

  async function updateDefault() {
    await prisma?.user.update({
      where: {
        id
      },
      data: {
        DefaultPayment: {
          update: {
            paymentId
          }
        }
      }
    }).then(e => {
      return res.status(200).send(e)
    }).catch(e => res.status(400).json(e))
  }


}

