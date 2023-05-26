import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import styles from "@/styles/pages/product/product.module.scss"
import {ProductDisplay} from "@/components/display/product/card";


export const getServerSideProps: GetServerSideProps<{}, {
  // userid: string
}> = async (context) => {
  return {
    props: {}
  }
};

function Product({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter()

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
          <div className={styles.header}>1</div>
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
          <ProductDisplay
            flowerName={"Black Eyed Susans"}
            description={
              `The "black eye" of black-eyed Susans refers to the dark brown center of their daisy-like flower heads. In addition, some species of black-eyed Susans are also known as Rudbeckia daisies.`
            }
            price={5}
            status={true}
          />
        </section>
      </main>
    </>
  )
}

export default Product