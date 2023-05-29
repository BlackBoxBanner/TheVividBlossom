import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import styles from "@/styles/pages/product/product.module.scss"
import {ProductDisplay, ProductType} from "@/components/display/product/card";
import {useEffect, useState} from "react";
import axios from "axios";
import {Product_Image, ProductStatus} from "@prisma/client"
import {combineImage} from "@/hook/image";
import {useSession} from "next-auth/react";
import {cardo} from "@/util/font";


export const getServerSideProps: GetServerSideProps<{}, {
  // userid: string
}> = async (context) => {
  return {
    props: {}
  }
};

function Product({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter()
  const {data: session} = useSession()

  const [products, setProducts] = useState<ProductType[]>([])
  const [userId, setUserId] = useState<string | null>()

  async function fetchHandler() {
    await axios<{
      title: string,
      description: string,
      id: string,
      selling_price: number,
      status: ProductStatus,
      Product_Image: Product_Image | null
    }[]>({
      url: "/api/product",
      method: "GET",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
      },
    }).then((productList) => {
      productList.data.map(product => {
        const storeProduct: ProductType = {
          id: product.id,
          status: product.status,
          price: product.selling_price,
          flowerName: product.title,
          description: product.description,
          image: combineImage({
            prefix: product.Product_Image!.prefix,
            data: {
              text1: product.Product_Image!.data1,
              text2: product.Product_Image!.data2,
              text3: product.Product_Image!.data3,
              text4: product.Product_Image!.data4,
              text5: product.Product_Image!.data5,
              text6: product.Product_Image!.data6,
              text7: product.Product_Image!.data7,
              text8: product.Product_Image!.data8,
              text9: product.Product_Image!.data9,
              text10: product.Product_Image!.data10,
              text11: product.Product_Image!.data11,
              text12: product.Product_Image!.data12,
              text13: product.Product_Image!.data13,
              text14: product.Product_Image!.data14,
              text15: product.Product_Image!.data15,
              text16: product.Product_Image!.data16,
            }
          })
        }
        setProducts(prevState => (
          [...prevState, storeProduct]
        ))
      })
    }).catch(e => {
      console.error(e)
    })
  }

  useEffect(() => {
    fetchHandler().then()
    return
  }, [])


  useEffect(() => {
    const email = session?.user?.email
    if (!email) return

    async function getUser() {
      return axios<{ id: string }>({
        baseURL: "/api/user/id",
        method: "GET",
        params: {
          email
        }
      });
    }

    getUser().then(e => {
      if (e.status == 200) {
        setUserId(e.data.id)
      }
    })

  }, [session?.user?.email])


  return (
    <>
      <Head>
        <title>Product - All flower seed</title>
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
      <main className={styles.main}>
        <section className={styles.gridDisplay}>
          <div className={`${styles.header} ${cardo.className}`}>
            <p className={`${styles.title}`}>
              The Vivid Blossomn
            </p>
          </div>
          {products && products.map((value, index, array) => {
            return (
              <ProductDisplay product={{...value}} userId={userId} key={index}/>
            )
          })}
        </section>
      </main>
    </>
  )
}

export default Product

const products: ProductType[] = [
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },
  {
    id: "",
    flowerName: "Black Eyed Susans",
    description: `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`,
    price: 5,
    status: "AVAILABLE",
    image: ""
  },

]