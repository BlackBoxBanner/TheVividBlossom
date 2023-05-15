import Head from "next/head";
import styles from "@/styles/pages/auth/login.module.scss"
import image from "@./public/pages/login/login_image.jpg"
import Image from "next/image"
import {ErrorMessage, Input} from "@/components/input";
import {useState} from "react";
import {Cardo, Outfit} from "next/font/google";
import {Button, ButtonLogin} from "@/components/button";

const cardo = Cardo({weight: "400", subsets: ["latin"], style: "italic"})

export default function Login() {
  const [error, setError] = useState(false)
  return (
    <>
      <Head>
        <title>Login</title>
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
        <div className={styles.formContainer}>
          <h1 className={`${styles.title} ${cardo.className}`}>LOG IN</h1>
          <form className={styles.form}>
            <div>
              <Input type="text" label={"Email"} error={error}/>
              {error ? <ErrorMessage>error</ErrorMessage> : <p style={{opacity: 0}}>.</p>}
            </div>
            <div>
              <Input type="password" label={"Password"} error={error}/>
              {error ? <ErrorMessage>error</ErrorMessage> : <p style={{opacity: 0}}>.</p>}
            </div>
            <ButtonLogin font={"Outfit"}>
              Log In
            </ButtonLogin>
          </form>
        </div>
        <div className={styles.imageContainer}>
          <Image src={image} alt="" className={styles.image}/>
        </div>
      </main>
    </>
  )
}


function Form() {

}