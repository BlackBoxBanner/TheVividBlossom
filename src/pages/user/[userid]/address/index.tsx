import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import SettingContainer from "@/components/display/user/settingContainer";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "@/styles/pages/user/payment.module.scss"
import {AddCardButton, CardDetail, CardContainer, CardAddressDetail} from "@/components/display/user/card"
import {Address, User_Payment} from ".prisma/client";

interface AddressProps {
  user: {
    name: string
    tel: string
  }
  address: Address[],
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

  const [userAddress, setUserAddress] = useState<AddressProps>()

  useEffect(() => {
    async function handler() {

      await axios<AddressProps>({
        url: "/api/user/address",
        headers: {
          Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        params: {
          id: userid
        }
      }).then((e) => {
        console.log(e.data.default)
        console.log(e.data)
        setUserAddress(e.data)
      }).catch(e => {
        console.error(e)
      })
    }

    handler().then()
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

  if (status == "loading") return <></>
  if (checkAuth()) return <></>

  return (
    <>
      <Head>
        <title>Shipping Address</title>
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
      <SettingContainer title={"Shipping Address"} onCancel={() => {
      }}>
        <div className={styles.main}>
          <AddCardButton for={"address"} onClick={() => router.push(`/user/${userid}/create/address`)}/>
          {userAddress?.address.map((value, index, array) => {
            return (
              <CardContainer type={"address"} key={index} default={userAddress?.default.includes(value.id)}>
                <CardAddressDetail
                  name={userAddress?.user.name!}
                  address={`${value.address_line1} ${value.address_line2} ${value.subDistrict} ${value.district} ${value.province} ${value.zipcode}`}
                  phoneNumber={userAddress?.user.tel!}
                />
              </CardContainer>
            )
          })}
        </div>
      </SettingContainer>
    </>
  )
}

export default Account