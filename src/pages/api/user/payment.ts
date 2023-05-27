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
      await createHandler(req, res).then()
      break
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
      await updatePayment().then()
      break
  }

  async function updatePayment() {
    const {name_on_card, card_number, card_expiry, cvv, paymentId, id} = req.body

    const [monthStr, yearStr] = card_expiry!.split(" / ");
    const date = new Date(Number(`20${yearStr}`), Number(monthStr) - 1);

    await prisma?.user_Payment.update({
      where: {
        id: paymentId
      },
      data: {
        name_on_card,
        card_number,
        card_expiry: date,
        cvv,
      }
    }).then(e => {
      return res.status(200).send(e)
    }).catch(e => res.status(400).json(e))
  }

  async function updateDefault() {
    console.log(id)
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

async function createHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const {id, name_on_card, card_number, card_expiry, cvv} = req.body

  const [monthStr, yearStr] = card_expiry!.split(" / ");
  const date = new Date(Number(`20${yearStr}`), Number(monthStr) - 1);

  await prisma?.user.update({
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
  }).then(e => {
    return res.status(200).json(e)
  }).catch(e => res.status(500).json(e))
}





