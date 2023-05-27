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
    name_on_card?: string
    card_number?: string
    card_expiry?: string
    cvv?: string
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
      break
    case "POST":
      await createHandler(req, res)
      break
    default:
      res.status(404).send("Not found!")
      break
  }
}

async function getHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const {id} = req.query
  const payment = await userGetPayment({id})

  if (!payment) return res.status(400).json({message: "Error"})
  return res.status(200).json({
    payment: payment?.User_Payment,
    default: payment?.DefaultPayment?.paymentId
  })
}

async function deleteHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const {paymentId} = req.body
  const payment = await prisma?.user_Payment.delete({
    where: {
      id: paymentId
    }
  })
  if (!payment) return res.status(400).json({message: "Error"})
  return res.status(200).json(payment)
}

async function patchHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const {paymentId, type, id} = req.body
  switch (type) {
    case "default":
      await updateDefault()
      break
    default:
      await updatePayment()
      break
  }

  async function updatePayment() {
    const {name_on_card, card_number, card_expiry, cvv, paymentId} = req.body

    const [monthStr, yearStr] = card_expiry!.split(" / ");
    const date = new Date(Number(`20${yearStr}`), Number(monthStr) - 1);

    const payment = await prisma?.user_Payment.update({
      where: {
        id: paymentId
      },
      data: {
        name_on_card,
        card_number,
        card_expiry: date,
        cvv,
      }
    })

    if (!payment) return res.status(400).json({message: "Error"})
    return res.status(200).json(payment)
  }

  async function updateDefault() {
    const payment = await prisma?.user.update({
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
    })

    if (!payment) return res.status(400).json({message: "Error"})
    return res.status(200).json(payment)
  }
}

async function createHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const {id, name_on_card, card_number, card_expiry, cvv} = req.body

  const [monthStr, yearStr] = card_expiry!.split(" / ");
  const date = new Date(Number(`20${yearStr}`), Number(monthStr) - 1);

  const payment = await prisma?.user.update({
    where: {
      id
    },
    data: {
      User_Payment: {
        create: {
          name_on_card: name_on_card!,
          card_number: card_number!,
          card_expiry: date,
          cvv: cvv!,
          card_type: "credit",
          provider: "MasterCard",
          create_at: new Date(),
        }
      }
    }
  })
  if (!payment) return res.status(400).json({message: "Error"})
  return res.status(200).json(payment)
}





