import prisma from "@/lib/prisma";
import {User, Address, User_Payment} from ".prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {hash} from "bcrypt";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {};
  body: {
    user: Partial<User>
    address: Partial<Address>
    payment: Partial<User_Payment>
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {

  switch (req.method) {
    case "POST":
      await postMethod()
      break
    default:
      res.status(200).send(`This api is use with POST method only!`)
      break
  }

  let errorArray: Record<string, string>[] = []

  function checkUser(user: Partial<User>) {
    if (user.first_name) errorArray.push({firstname: "Firstname is missing"})
    if (user.last_name) errorArray.push({Lastname: "Lastname is missing"})
    if (user.email) errorArray.push({email: "Email is missing"})
    if (user.dob) errorArray.push({dateOfBirth: "Date of birth is missing"})
    if (user.password) errorArray.push({password: "password is missing"})
    if (user.telephone) errorArray.push({telephone: "Phone number is missing"})
    // todo : check date of date is valid.
  }

  function checkAddress(address: Partial<Address>) {
    if (address.address_line1) errorArray.push({address_line1: "Address line 1 is missing"})
    if (address.subDistrict) errorArray.push({subDistrict: "Sub district is missing"})
    if (address.district) errorArray.push({district: "District is missing"})
    if (address.province) errorArray.push({province: "Province is missing"})
    if (address.zipcode) errorArray.push({zipcode: "Zipcode is missing"})
  }

  function checkPayment(payment: Partial<User_Payment>) {
    if (payment.card_number) errorArray.push({card_number: "Card number is missing"})
    if (payment.name_on_card) errorArray.push({name_on_card: "Name on card is missing"})
    if (payment.card_expiry) errorArray.push({card_expiry: "Card expire date is missing"})
    if (payment.cvv) errorArray.push({cvv: "CVV code is missing"})
  }

  async function checkUserExist(user: Partial<User>) {
    const exists = await prisma.user.findUnique({
      where: {
        email: user.email!
      },
    })
    return !exists;
  }

  async function postMethod() {

    if (
      req.headers.authorization != `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
    ) {
      return res.status(401).send("un-authorization")
    }

    const {user, address, payment} = req.body;
    checkUser(user)
    checkAddress(address)
    checkPayment(payment)

    if (errorArray) {
      return res.status(400).json(errorArray)
    }

    let userExist: string[] = []
    await checkUserExist(user).then((e) => {
      userExist.push("User already exists")
    })

    if (userExist) return res.status(400).json(userExist)


    await createUser({user, payment, address})

    res.status(200)
  }
}

async function createUser(props: {
  user: Partial<User>,
  address: Partial<Address>,
  payment: Partial<User_Payment>
}) {
  await prisma.user.create({
    data: {
      first_name: props.user.first_name!,
      last_name: props.user.last_name!,
      telephone: props.user.telephone!,
      dob: new Date(props.user.dob!),
      email: props.user.email!,
      password: await hash(props.user.password!, 10),
      register_on: new Date(),
      Address: {
        create: {
          address_line1: props.address.address_line1!,
          address_line2: props.address.address_line2!,
          subDistrict: props.address.subDistrict!,
          district: props.address.district!,
          province: props.address.province!,
          zipcode: props.address.zipcode!,
          create_at: new Date(),
        },
      },
      User_Payment: {
        create: {
          name_on_card: props.payment.name_on_card!,
          card_number: props.payment.card_number!,
          card_expiry: props.payment.card_expiry!,
          cvv: props.payment.cvv!,
          card_type: "credit",
          provider: "MasterCard",
          create_at: new Date(),
        },
      },
    },
  });
}