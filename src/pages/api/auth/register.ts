import prisma from "@/lib/prisma";
import {User, Address, User_Payment} from ".prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {hash} from "bcrypt";
import {breakImage} from "@/hook/image";

export interface PostType {
  user: Partial<User>
  address: Partial<Address>
  payment: Partial<User_Payment>
}

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {};
  body: PostType
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

  async function postMethod() {

    if (
      req.headers.authorization != `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
    ) {
      return res.status(401).send("un-authorization")
    }

    const {user, address, payment} = req.body;

    let errorArray: Record<string, string>[] = []
    console.log("Starting checking user input")
    await checkUser(user)
    await checkAddress(address)
    await checkPayment(payment)
    console.log("User input verify")


    function checkUser(user: Partial<User>) {
      if (!user.first_name) errorArray.push({firstname: "Firstname is missing"})
      if (!user.last_name) errorArray.push({Lastname: "Lastname is missing"})
      if (!user.email) errorArray.push({email: "Email is missing"})
      if (!user.dob) errorArray.push({dateOfBirth: "Date of birth is missing"})
      if (!user.password) errorArray.push({password: "password is missing"})
      if (!user.telephone) errorArray.push({telephone: "Phone number is missing"})
      // todo : check date of date is valid.
    }

    function checkAddress(address: Partial<Address>) {
      if (!address.address_line1) errorArray.push({address_line1: "Address line 1 is missing"})
      if (!address.subDistrict) errorArray.push({subDistrict: "Sub district is missing"})
      if (!address.district) errorArray.push({district: "District is missing"})
      if (!address.province) errorArray.push({province: "Province is missing"})
      if (!address.zipcode) errorArray.push({zipcode: "Zipcode is missing"})
    }

    function checkPayment(payment: Partial<User_Payment>) {
      if (!payment.card_number) errorArray.push({card_number: "Card number is missing"})
      if (!payment.name_on_card) errorArray.push({name_on_card: "Name on card is missing"})
      if (!payment.card_expiry) errorArray.push({card_expiry: "Card expire date is missing"})
      if (!payment.cvv) errorArray.push({cvv: "CVV code is missing"})
    }

    async function checkUserExist(user: Partial<User>) {
      const exists = await prisma.user.findUnique({
        where: {
          email: user.email!
        },
      })
      return !!exists;
    }

    if (errorArray.length !== 0) {
      return res.status(400).json(errorArray)
    }

    console.log("Starting check if user already exist.")
    let userExist: string[] = []
    await checkUserExist(user).then(() => {
      userExist.push("User already exists")
    })
    if (userExist.length === 0) return res.status(400).json(userExist)
    console.log("User is not existed.")

    console.log("Creating user")
    await createUser({user, payment, address}).then((e) => console.log(e))
    console.log("User created")

    res.status(200).send("User created")
  }
}

async function createUser(props: {
  user: Partial<User>,
  address: Partial<Address>,
  payment: Partial<User_Payment>
}) {
  // const imageId = await uploadImage(props.user.image);

  if (props.user.image) {
    const imageData = breakImage(props.user.image)

    await prisma.user.create({
      data: {
        first_name: props.user.first_name!,
        last_name: props.user.last_name!,
        telephone: props.user.telephone!,
        dob: new Date(String(props.user.dob).split(" / ").reverse().join("-")).toISOString(),
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
        User_Image: {
          create: {
            prefix: imageData.prefix,
            data1: imageData.data.text1,
            data2: imageData.data.text2,
            data3: imageData.data.text3,
            data4: imageData.data.text4,
            data5: imageData.data.text5,
            data6: imageData.data.text6,
            data7: imageData.data.text7,
            data8: imageData.data.text8,
            data9: imageData.data.text9,
            data10: imageData.data.text10,
            data11: imageData.data.text11,
            data12: imageData.data.text12,
            data13: imageData.data.text13,
            data14: imageData.data.text14,
            data15: imageData.data.text15,
            data16: imageData.data.text16,
          }
        }
      },
    })
  } else {
    await prisma.user.create({
      data: {
        first_name: props.user.first_name!,
        last_name: props.user.last_name!,
        telephone: props.user.telephone!,
        dob: new Date(String(props.user.dob).split(" / ").reverse().join("-")).toISOString(),
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
        User_Image: {
          create: {
            prefix: "",
            data1: "",
            data2: "",
            data3: "",
            data4: "",
            data5: "",
            data6: "",
            data7: "",
            data8: "",
            data9: "",
            data10: "",
            data11: "",
            data12: "",
            data13: "",
            data14: "",
            data15: "",
            data16: "",
          }
        }
      },
    })
  }
}

