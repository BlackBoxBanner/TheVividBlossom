import Head from "next/head";
import {Cardo} from "next/font/google";

import styles from "@/styles/pages/admin/auth/admin_auth.module.scss"

import {FormInput} from "@/components/input";
import {ButtonLogin} from "@/components/button";

import {useForm, SubmitHandler,} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {signIn, useSession} from "next-auth/react"
import {useRouter} from "next/router";
import {useState} from "react";
import {useProcessing} from "@/components/display/processing/container";
import {WaitingContent} from "@/components/display/processing/waiting";

const cardo = Cardo({weight: "400", subsets: ["latin"], style: "italic"})

const schema = z.object({
  usernames: z.string().min(1, "Please enter your username"),
  password: z.string().min(1, "Please enter your password"),
})

type DataProps = z.infer<typeof schema>

export default function Login() {
  const {Processing, setState} = useProcessing()
  const router = useRouter()
  const [disable, setDisable] = useState(false)

  const {register, handleSubmit, formState: {errors}, setError} = useForm<DataProps>({resolver: zodResolver(schema)})
  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    setDisable(true)
    setState(e => !e)
    await signIn("credentials", {
      usernames: data.usernames,
      password: data.password,
      type: "admin",
      redirect: false
    }).then((e) => {
      if (e?.error) {
        try {
          const error = JSON.parse(e.error) as { name: "usernames" | "password", message: string }
          setError(error.name, {message: error.message})
          setState(e => !e)
        } catch (error) {
          console.error(e)
          setState(e => !e)
        }
        setDisable(false)
      } else {
        router.push("/")
      }
    })
  }

  const {status} = useSession()

  function checkAuth() {
    if (status == "authenticated") {
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
        <title>Admin - Login</title>
        <meta
          name="description"
          content="The Vivid Blossom admin login page"
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
      <Processing>
        <WaitingContent title={"session"}/>
      </Processing>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={`${styles.title} ${cardo.className}`}>LOG IN</h1>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput error={errors.usernames?.message}
                       label={"Username"}  {...register("usernames")}/>
            <FormInput type="password" label={"Password"}
                       error={errors.password?.message} {...register("password")}/>
            <div
              style={{width: "100%", display: "flex", justifyContent: "space-between", gap: "2rem"}}>
              <ButtonLogin disabled={disable} font={"Outfit"} style={{width: "100%"}}>
                Log In
              </ButtonLogin>
              <ButtonLogin disabled={disable} font={"Outfit"} dark style={{width: "100%"}}>
                Cancel
              </ButtonLogin>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

