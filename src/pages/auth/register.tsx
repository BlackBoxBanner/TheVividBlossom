import Head from "next/head";
import styles from "@/styles/pages/auth/register.module.scss"
import Image from "next/image"
import {RegisterInput, RegisterInputMask} from "@/components/input";
import {Cardo, Outfit} from "next/font/google";
import {ButtonLogin} from "@/components/button";
import {SubmitHandler, useForm,} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {FormContainer} from "@/components/display/register/formcontainer";
import {convertImageUrlToBase64, eventToUrl} from "@/hook/urltobase64";
import {ComponentProps, useEffect, useState} from "react";
import {BsCamera, BsPersonFill} from "react-icons/bs";
import mastercard from "@./public/pages/register/mastercard.svg"
import visa from "@./public/pages/register/visa.svg"
import {GetServerSideProps} from "next";
import prisma from "@/lib/prisma";
import axios from "axios"
import {PostType} from "@/pages/api/auth/register";
import {useRouter} from "next/router";


const outfit = Outfit({weight: "400", style: "normal", subsets: ["latin"]})
const cardo = Cardo({weight: "400", subsets: ["greek"], style: "italic"})
const outfitLabel = Outfit({weight: "500", style: ["normal"], subsets: ["latin"]});
const outfitStrong = Outfit({weight: "600", style: ["normal"], subsets: ["latin"]});


interface RegisterProps {
  user: { email: string }[]
}


export default function Register(props: RegisterProps) {
  const [usersEmail, setUsersEmail] = useState<string[]>([])

  const router = useRouter()

  useEffect(() => {
    props.user.map((e) => {
      setUsersEmail(prev => [...prev, e.email]);
    })
  }, [props])
  type DataProps = z.infer<typeof schema>

  const dateRegex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;

  const schema = z.object({
    info: z.object({
      image: z.any(),
      first_name: z.string().min(1, "Please fill out your first name"),
      last_name: z.string().min(1, "Please fill out your last name"),
      dob: z.string().min(1, "Invalid birthdate").optional().refine((value) => {
        return !dateRegex.test(value!);
      }, "Invalid birthdate format (DD / MM / YYYY)"),
      email: z.string().email().refine((value) => {
        // Add your disallowed email addresses to this array
        return !usersEmail.includes(value)
      }, "Invalid email"),
      password: z.string().min(1, "Please enter your password"),
      confirmedPassword: z.string().min(1, "Please enter your password").refine((value) => {
        const password = getValues("info.password") as string;
        return value === password
      }, "Passwords do not match. Please try again."),
      telephone: z.string().refine((value) => {
        const regex = /^\d{3} \d{3} \d{4}$/;
        return regex.test(value);
      }, "Invalid phone number"),
    }),
    address: z.object({
      address_line_1: z.string().min(1, "Please fill out your address"),
      address_line_2: z.string(),
      subDistrict: z.string().min(1, "Please fill out your sub district"),
      district: z.string().min(1, "Please fill out your district"),
      province: z.string().min(1, "Please fill out your province"),
      zipcode: z.string().min(1, "Please fill out your postal code"),
    }),
    payment: z.object({
      card_number: z.string()
        .min(1, "Please fill out your card number")
        .max(19, "Please fill out your card number")
        .refine((number) => {
          const regex = /^\d{4} \d{4} \d{4} \d{4}$/;
          return regex.test(number);
        }, "Please fill out your card number"),
      name_on_card: z.string().min(1, "Please fill out your cardholder name"),
      card_expiry: z.string().refine((value) => {
        const regex = /^(0[1-9]|1[0-2]) \/ (0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])$/;
        return regex.test(value);
      }, "Please fill out your card expiry date"),
      cvv: z.string().min(1, "Please fill out your card security code").max(3, "Please fill out your card security code"),
    }),
  })

  const [image, setImage] = useState("")

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setError,
    clearErrors,
    getValues
  } = useForm<DataProps>({resolver: zodResolver(schema)})

  async function getImage(e: File) {
    const imageUrl = eventToUrl(e)
    return await convertImageUrlToBase64(imageUrl!)
  }

  useEffect(() => {
    const subscription = watch(async (value) => {
      if (value.info?.image[0]) {
        getImage(value.info?.image[0]).then((e) => {
          setImage(e!)
        })
      }
    });
    return () => subscription.unsubscribe();
  }, [watch])

  useEffect(() => {
    const subscription = watch(async (value) => {
      if (value.info?.password !== value.info?.confirmedPassword) {
        await setError("info.confirmedPassword", {
          message: "Passwords do not match. Please try again.",
        })
      }
      if (value.info?.password === value.info?.confirmedPassword) {
        clearErrors(["info.confirmedPassword", "info.password"])
      }
    });
    return () => subscription.unsubscribe();
  }, [clearErrors, setError, watch])

  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    const [monthStr, yearStr] = data.payment.card_expiry.split(" / ");
    const date = new Date(Number(`20${yearStr}`), Number(monthStr) - 1);

    const req = await axios({
      baseURL: "/api/auth/register",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      data: {
        user: {
          image: image,
          email: data.info.email,
          first_name: data.info.first_name,
          last_name: data.info.last_name,
          telephone: data.info.telephone,
          dob: data.info.dob,
          password: data.info.password,
        },
        address: {
          address_line1: data.address.address_line_1,
          address_line2: data.address.address_line_2,
          subDistrict: data.address.subDistrict,
          district: data.address.district,
          province: data.address.province,
          zipcode: data.address.zipcode,
        },
        payment: {
          card_number: data.payment.card_number,
          name_on_card: data.payment.name_on_card,
          card_expiry: date,
          cvv: data.payment.cvv,
        }
      } as PostType
    }).then((e) => {
      if (e.status == 200) {
        router.push("/auth/login")
      }
    })

    // todo : NOTE delete console.log()
    console.log(req)
  }

  return (
    <>
      <Head>
        <title>Register</title>
        <meta
          name="description"
          content="The Vivid Blossom login page"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={`${styles.title} ${cardo.className}`}>
            {String("Create an account").toUpperCase()}
          </div>
          <div className={`${outfit.className} ${styles.subtitle}`}>Fields marked * are mandatory</div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <FormContainer header={"Personal Information"}>
            <div className={styles.imageContainer}>
              <div className={styles.imageCoverContainer}>
                <label className={styles.imageInputContainer} htmlFor={"image"}>
                  {image ?
                    <div style={{position: "relative", height: "100%", width: "100%"}}>
                      <Image src={image} className={styles.image} alt={"user profile"} fill
                             style={{objectFit: "cover"}}/>
                    </div> :
                    <BsPersonFill size={70} className={styles.person}/>}

                  <input type="file" style={{display: "none"}} id={"image"} {...register("info.image")} accept="image/*"
                         className={styles.imageInput}/>
                </label>
                <div>
                  <BsCamera size={20} className={styles.camera}/>
                </div>
              </div>
            </div>
            <RegisterInput label={"First Name *"} placeholder={"First Name"}
                           error={errors.info?.first_name?.message} {...register("info.first_name")}/>
            <RegisterInput label={"Last Name *"} placeholder={"Last Name"}
                           error={errors.info?.last_name?.message} {...register("info.last_name")}/>
            <RegisterInputMask label={"Phone Number *"} placeholder={"012 345 6789"} id={"telephone"}
                               mask={"999 999 9999"}
                               error={errors.info?.telephone?.message} {...register("info.telephone")}/>
            <RegisterInputMask label={"Birthdate"} id={"dob"} placeholder={"DD / MM / YYYY"} mask={"99 / 99 / 9999"}
                               error={errors.info?.dob?.message} {...register("info.dob")}/>
            <RegisterInput label={"Email *"}
                           error={errors.info?.email?.message}
                           placeholder={"Example@mail.com"} {...register("info.email")}/>
            <RegisterInput label={"Password *"} placeholder={"Password"} type={"password"}
                           error={errors.info?.password?.message} {...register("info.password")}/>
            <RegisterInput label={"Confirmed Password *"} placeholder={"Confirmed Password"} type={"password"}
                           error={errors.info?.confirmedPassword?.message} {...register("info.confirmedPassword")}/>
          </FormContainer>
          <FormContainer header={"Shipping Address"}>
            <RegisterInput label={"Address Line 1 *"}
                           error={errors.address?.address_line_1?.message}
                           placeholder={"House number, Village no, Street address"} {...register("address.address_line_1")}/>
            <RegisterInput label={"Address Line 2"}
                           error={errors.address?.address_line_2?.message}
                           placeholder={"Village / Building name, Floor number"} {...register("address.address_line_2")}/>
            <RegisterInput label={"Sub District *"}
                           error={errors.address?.subDistrict?.message}
                           placeholder={"Sub District"} {...register("address.subDistrict")}/>
            <RegisterInput label={"District *"}
                           error={errors.address?.district?.message}
                           placeholder={"District"} {...register("address.district")}/>
            <RegisterInput label={"Province *"}
                           error={errors.address?.province?.message}
                           placeholder={"Province"} {...register("address.province")}/>
            <RegisterInputMask label={"Postal code *"} mask={"99999"}
                               error={errors.address?.zipcode?.message}
                               placeholder={"XXXXX"} {...register("address.zipcode")}/>
          </FormContainer>
          <FormContainer header={"Payment Detail"}>
            <div className={`${styles.paymentInfoContainer} ${outfit.className} ${styles.colorText}`}>
              <div className={`${styles.paymentInfoTitle} ${outfitLabel.className}`}>Payment Method</div>
              <div className={styles.paymentInfoDescription}>Our store is providing <Strong>Credit cards, Debit
                cards,</Strong> and <Strong>Prepaid cards</Strong> for payment only.
              </div>
              <div className={styles.cardTitle}>
                <Image src={mastercard} alt={"mastercard"} className={styles.cardImage}/>
                <Image src={visa} alt={"visa"} className={`${styles.cardImage} ${styles.visa}`}/>
              </div>
            </div>
            <RegisterInput label={"Cardholder Name *"}
                           error={errors.payment?.name_on_card?.message}
                           placeholder={"Cardholder Name"} {...register("payment.name_on_card")}/>
            <RegisterInputMask label={"Card Number *"} mask={"9999 9999 9999 9999"}
                               error={errors.payment?.card_number?.message}
                               placeholder={"XXXX XXXX XXXX XXXX"} {...register("payment.card_number")}/>
            <RegisterInputMask label={"Expiry Date *"} mask={"99 / 99"}
                               error={errors.payment?.card_expiry?.message}
                               placeholder={"MM / YY"} {...register("payment.card_expiry")}/>
            <RegisterInputMask label={"Security Code *"} mask={"999"} type={"password"}
                               error={errors.payment?.cvv?.message}
                               placeholder={"CVC"} {...register("payment.cvv")}/>
            <RegisterInput label={"Country"} error={""} placeholder={"Country"}/>
          </FormContainer>
          <ButtonLogin font={"Outfit"}>Create an account</ButtonLogin>
        </form>
      </main>
    </>
  )
}

interface StrongProps extends ComponentProps<"div"> {
}

function Strong(props: StrongProps) {
  return <span className={outfitStrong.className}>{props.children}</span>
}


// @ts-ignore
export const getServerSideProps: GetServerSideProps = async () => {
  const user = await prisma.user.findMany({
    select: {
      email: true
    }
  })
  return {
    props: {user}
  }
};