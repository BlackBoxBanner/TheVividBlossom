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

interface ServerSideProps {
  userid: string | undefined
  paymentid: string | undefined
  payment: Partial<{
    name_on_card: string
    card_number: string
    card_expiry: string
    cvv: string
  }> | null
}

export const getServerSideProps: GetServerSideProps<ServerSideProps, {
  userid: string,
  paymentid: string
}> = async (context) => {
  const userid = context.params?.userid
  const paymentid = context.params?.paymentid

  const resData = await prisma?.user_Payment.findUnique({
    where: {
      id: paymentid
    }
  })

  return {
    props: {
      userid,
      paymentid,
      payment: {
        name_on_card: resData?.name_on_card,
        card_number: resData?.card_number,
        card_expiry: String(resData?.card_expiry),
        cvv: resData?.cvv,
      }
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

function EditAddress({userid, payment, paymentid}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const {register, handleSubmit, formState: {errors}, setError, watch} = useForm<DataProps>({
    resolver: zodResolver(schema),
    values: {
      name_on_card: payment?.name_on_card!,
      card_number: payment?.card_number!,
      card_expiry: new Date(String(payment?.card_expiry)).toLocaleDateString('en-US', {
        month: '2-digit',
        year: '2-digit'
      }).replace('/', ' / '),
      cvv: payment?.cvv!,
    }
  })

  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    await axios({
      url: "/api/user/payment/update",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      data: {
        paymentId: paymentid,
        name_on_card: data.name_on_card,
        card_number: data.card_number,
        card_expiry: data.card_expiry,
        cvv: data.cvv,
      }
    }).then(() => {
      router.push(`/user/${userid}/payment`)
    }).catch(e => {
      console.error(e)
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
        <title>Payment Detail</title>
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
      <SettingContainer title={"Payment Detail"} formId={"editAccount"} onCancel={() => {
        router.push(`/user/${userid}/address`).then()
      }}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`} id={"editAccount"}>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Cardholder Name *"}
                              placeholder={"Cardholder Name"}  {...register("name_on_card")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask label={"Card Number *"} mask={"9999 9999 9999 9999"}
                                  placeholder={"XXXX XXXX XXXX XXXX"} {...register("card_number")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask label={"Expiry Date *"} mask={"99 / 99"}
                                  placeholder={"MM / YY"} {...register("card_expiry")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask label={"Security Code *"} mask={"999"}
                                  placeholder={"CVC"} {...register("cvv")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Country"} placeholder={"Country"}/>
          </div>
        </form>
      </SettingContainer>
    </>
  )
}

export default EditAddress