import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {PageLayout} from "@/components/display/user/settingContainer";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "@/styles/pages/user/basket.module.scss"
import {AddCardButton, CardDetail, CardContainer} from "@/components/display/user/card"
import {User_Payment} from ".prisma/client";
import {Button, ButtonLogin} from "@/components/button";
import {cardo, outfit, outfitLabel} from "@/util/font";
import {WishlistItem, Items} from "@/components/user/wishlistItem";

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


function MyBasket({userid}: InferGetServerSidePropsType<typeof getServerSideProps>) {

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


  useEffect(() => {
    fetchHandler().then()
    return
  }, [userid])

  // todo - replace with data from database
  const items: Items[] = [
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 0,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 1,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 0,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 0,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 0,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      inventory: 2,
      image: "",
    },

  ]

  const [price, setPrice] = useState(0)

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
        <title>My Wishlist</title>
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
      <PageLayout title={"My Wishlist"} button={{
        btn1: {
          title: "Cancel",
          function: () => {
          }
        },
        btn2: {
          title: "Keep Shopping",
          function: () => {
          }
        }
      }}>
        <div className={`${styles.main} ${outfit.className}`}>
          <section className={`${styles.contentWish} ${styles.container}`}>
            {items.map((value, index, array) => {
              return <WishlistItem items={value} key={index}/>
            })}
          </section>
        </div>
      </PageLayout>
    </>
  )
}

export default MyBasket