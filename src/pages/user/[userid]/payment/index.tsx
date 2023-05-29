import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import SettingContainer from "@/components/display/user/settingContainer";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "@/styles/pages/user/payment.module.scss"
import {AddCardButton, CardDetail, CardContainer} from "@/components/display/user/card"
import {User_Payment} from ".prisma/client";

interface PaymentProps {
  payment: User_Payment[],
  default: string
}

export const getServerSideProps: GetServerSideProps<{ userid: string | undefined }, {
  userid: string
}> = async (context) => {
  const userid = context.params?.userid

  return {
    props: {
      userid
    }
  }
};


function Account({userid}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter()

  const [userPayment, setUserPayment] = useState<PaymentProps>()

  async function fetchHandler() {

    await axios<PaymentProps>({
      url: "/api/user/payment/get/all",
      method: "GET",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      params: {
        id: userid
      }
    }).then((e) => {
      console.log(e.data.default)
      setUserPayment(e.data)
    }).catch(e => {
      console.error(e)
    })
  }

  async function onDelete(id: string) {
    console.log(id)
    await axios({
      url: "/api/user/payment/delete",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      data: {
        paymentId: id
      }
    }).then(() => fetchHandler().then()).catch(e => {
      console.error(e)
    })
  }

  async function onUpdateDefault(id: string) {
    console.log(id)
    await axios({
      url: "/api/user/payment/update/default",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      data: {
        paymentId: id,
        userid
      }
    }).then(() => fetchHandler().then()).catch(e => {
      console.error(e)
    })
  }

  useEffect(() => {
    fetchHandler().then()
    return
  }, [userid])

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

  if (userid == "no-id") Relocate().then()

  if (status == "loading") return <></>
  if (checkAuth()) return <></>

  return (
    <>
      <Head>
        <title>Payment Method</title>
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
      <SettingContainer title={"Payment Method"} onCancel={() => {
      }}>
        <div className={styles.main}>
          <AddCardButton onClick={() => router.push(`/user/${userid}/create/payment`)}/>
          {userPayment?.payment.map((value, index, array) => {
            const date = new Date(String(value.card_expiry))
            const expDate = `${date.getMonth() + 1} / ${date.getFullYear().toString().slice(2)}`
            return (
              <CardContainer type={"payment"} key={index} default={userPayment?.default.includes(value.id)}
                             valId={value.id} userId={userid!}
                             onDelete={() => {
                               onDelete(value.id).then()
                             }}
                             changeDefault={() => {
                               onUpdateDefault(value.id).then()
                             }}>
                <CardDetail name={value.name_on_card} cardNo={value.card_number}
                            provider={value.provider}
                            expDate={expDate}/>
              </CardContainer>
            )
          })}
        </div>
      </SettingContainer>
    </>
  )
}

export default Account