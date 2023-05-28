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

import {BasketItem, Items} from "@/components/user/basketItem";

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
      quantity: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      quantity: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      quantity: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      quantity: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      quantity: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      quantity: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      quantity: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      quantity: 2,
      image: "",
    },
    {
      name: "Black Eyed Susans",
      description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
      price: 5,
      quantity: 2,
      image: "",
    },
  ]

  const [price, setPrice] = useState(0)

  function getAmount() {
    setPrice(0)
    items.forEach((item) => {
      setPrice(e => e + (parseInt(String(item.price)) * parseInt(String(item.quantity))))
    })
  }


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleInputChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getAmount, 5000);
    };

    handleInputChange()

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

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
      <PageLayout title={"My Basket"} onCancel={() => {
        router.push("/").then()
      }}>
        <div className={`${styles.main} ${outfit.className}`}>
          <section className={`${styles.content} ${styles.container}`}>
            {items.map((value, index, array) => {
              return <BasketItem items={value} key={index}/>
            })}
          </section>
          <section className={`${styles.summaryContainer} ${styles.container}`}>
            <header className={`${styles.header} ${cardo.className}`}>
              Order Summary
            </header>
            <div className={`${styles.divider}`}/>
            <div className={`${styles.price} ${outfitLabel.className}`}>
              <article>
                <p>Sub Total :</p>
                <p className={`${styles.number}`}>{`$ ${price}`}</p>
              </article>
              <div>
                <ButtonLogin font={"Outfit"}>Buy now</ButtonLogin>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  )
}

export default MyBasket