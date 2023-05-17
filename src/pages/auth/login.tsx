import Head from "next/head";
import Image from "next/image"
import Link from "next/link";
import {Cardo} from "next/font/google";

import styles from "@/styles/pages/auth/login.module.scss"

import image from "@./public/pages/login/login_image.jpg"

import {FormInput} from "@/components/input";
import {ButtonLogin} from "@/components/button";

import {useForm, SubmitHandler,} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {signIn, useSession} from "next-auth/react"

const cardo = Cardo({weight: "400", subsets: ["latin"], style: "italic"})


const schema = z.object({
  email: z.string().min(1, "Please enter your Email").email("Invalid Email"),
  password: z.string().min(1, "Please enter your password"),
})

type DataProps = z.infer<typeof schema>

export default function Login() {

  const {register, handleSubmit, formState: {errors}, setError} = useForm<DataProps>({resolver: zodResolver(schema)})
  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    }).then((e) => {
      if (e?.error) {
        const error = JSON.parse(e.error) as { name: "email" | "password", message: string }
        setError(error.name, {message: error.message})
      }
    })
  }
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
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput error={errors.email?.message}
                       label={"Email"}  {...register("email")}/>
            <div className={styles.passwordRelative}>
              <FormInput type="password" label={"Password"}
                         error={errors.password?.message} {...register("password")}/>
              <div className={styles.forgetPasswordContainer}>
                <Link href={""} className={`${styles.forgetPassword}`} style={cardo.style}>Forget password ?</Link>
              </div>
            </div>
            <ButtonLogin font={"Outfit"} style={{marginTop: "1rem"}}>
              Log In
            </ButtonLogin>
          </form>
          <div className={`${styles.offer} ${cardo.className}`}>
            <p>Don’t have an account ?</p>
            <div className={styles.createAccount}>
              <Link href={"/auth/register"}>Create an account</Link>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={image} alt="" className={styles.image} priority={true} placeholder={"blur"}/>
        </div>
      </main>
    </>
  )
}

