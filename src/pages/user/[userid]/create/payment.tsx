import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import prisma from "@/lib/prisma";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "@/styles/pages/user/user.module.scss"
import SettingContainer from "@/components/display/user/settingContainer";
import {
  AccountFormInput,
  AccountFormInputMask, SettingLabel,
} from "@/components/input";
import axios from "axios";
import {Address, User_Payment} from ".prisma/client";
import {outfit, outfitLabel, outfitStrong} from "@/util/font";
import Image from "next/image";
import mastercard from "@./public/pages/register/mastercard.svg";
import visa from "@./public/pages/register/visa.svg";
import {ComponentProps} from "react";

interface ServerSideProps {
  userid: string | undefined
}

export const getServerSideProps: GetServerSideProps<ServerSideProps, {
  userid: string,
}> = async (context) => {
  const userid = context.params?.userid

  return {
    props: {
      userid,
    }
  }
};

const schema = z.object({
  name_on_card: z.string().min(1, ""),
  card_number: z.string().min(1, ""),
  card_expiry: z.string().min(1, ""),
  cvv: z.string().min(1, ""),
})

type DataProps = z.infer<typeof schema>

function EditAddress({userid}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const {register, handleSubmit, formState: {errors}, setError, watch} = useForm<DataProps>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   name_on_card: payment?.name_on_card,
    //   card_number: payment?.card_number,
    //   card_expiry: new Date(String(payment?.card_expiry)).toLocaleDateString('en-US', {
    //     month: '2-digit',
    //     year: '2-digit'
    //   }).replace('/', ' / '),
    //   cvv: payment?.cvv,
    // }
  })

  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    await axios({
      url: "/api/user/payment",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      data: {
        id: userid,
        name_on_card: data.name_on_card,
        card_number: data.card_number,
        card_expiry: data.card_expiry,
        cvv: data.cvv,
      }
    }).then(() => {
      router.push(`/user/${userid}/payment`)
    }).catch(e => {
      console.error({Error: e})
    })
  }

  // do not touch
  const {status} = useSession()

  function checkAuth() {
    if (status == "unauthenticated") {
      router.push("/").then()
      return true
    }
    return false
  }

  async function Relocate() {
    await router.push("/").then()
  }

  // if (!user) Relocate().then()
  if (status == "loading") return <></>
  if (checkAuth()) return <></>

  return (
    <>
      <Head>
        <title>Add New Payment</title>
        <meta
          name="description"
          content="CPE241 - Database System Project"
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
      <SettingContainer title={"Add New Payment"} formId={"editAccount"} onCancel={() => {
        router.push(`/user/${userid}/address`).then()
      }}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`} id={"editAccount"}>
          <div className={styles.inputContainer}>
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
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Cardholder Name *"} edit
                              placeholder={"Cardholder Name"}  {...register("name_on_card")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask label={"Card Number *"} mask={"9999 9999 9999 9999"} edit
                                  placeholder={"XXXX XXXX XXXX XXXX"} {...register("card_number")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask label={"Expiry Date *"} mask={"99 / 99"} edit
                                  placeholder={"MM / YY"} {...register("card_expiry")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask label={"Security Code *"} mask={"999"} edit
                                  placeholder={"CVC"} {...register("cvv")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Country"} placeholder={"Country"} edit/>
          </div>
        </form>
      </SettingContainer>
    </>
  )
}

export default EditAddress

function Strong(props: ComponentProps<"div">) {
  return <span className={outfitStrong.className}>{props.children}</span>
}