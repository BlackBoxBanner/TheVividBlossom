import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "@/styles/pages/user/user.module.scss"
import SettingContainer from "@/components/display/user/settingContainer";
import {
  AccountFormInput,
} from "@/components/input";
import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "@prisma/client";

interface ServerSideProps {

}

export const getServerSideProps: GetServerSideProps<{ userid: string | undefined }, {
  userid: string
}> = async (context) => {
  const userid = context.params?.userid
  return {
    props: {userid: userid}
  }
};

const schema = z.object({
  email: z.string().min(1, ""),
  cPassword: z.string().min(1, ""),
  nPassword: z.string().min(1, ""),
  cfPassword: z.string().min(1, ""),
})

type DataProps = z.infer<typeof schema>

function AddAddress({userid}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const [user, setUser] = useState<User>()

  const {register, handleSubmit, formState: {errors}, setError, watch} = useForm<DataProps>({
    resolver: zodResolver(schema),
    values: {
      email: user?.email!,
      cPassword: "",
      nPassword: "",
      cfPassword: "",
    }
  })

  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    await axios({
      url: "/api/user/security",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      data: {
        id: user?.id,
        email: data.email,
        dPassword: user?.password,
        cPassword: data.cPassword,
        nPassword: data.nPassword,
        cfPassword: data.cfPassword,
      }
    }).then(() => {
      router.push(`/`)
    }).catch(e => {
      console.error(e)
    })
  }

  async function fetchData() {
    await axios<{ user: User }>({
      url: "/api/user/user",
      method: "GET",
      params: {
        id: userid,
      }
    }).then((e) => {
      setUser(e.data.user)
    }).catch(e => {
      console.error(e)
    })
  }

  useEffect(() => {
    fetchData().then()
  }, [])

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

  if (!user) Relocate().then()
  if (status == "loading") return <></>
  if (checkAuth()) return <></>

  return (
    <>
      <Head>
        <title>Login and Security</title>
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
      <SettingContainer title={"Login and Security"} formId={"editAccount"}  onCancel={() => {
        router.push(`/`).then()
      }}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`} id={"editAccount"}>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Email *"} autoComplete={"email"}
                              placeholder={"Email"}  {...register("email")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Current Password *"} type={"password"} autoComplete={"current-password"}
                              placeholder={"Current Password"} {...register("cPassword")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"New Password"} placeholder={"New Password"} autoComplete={"new-password"}
                              type={"password"} {...register("nPassword")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Confirmed Password"} type={"password"} autoComplete={"new-password"}
                              placeholder={"Confirmed Password"} {...register("cfPassword")}/>
          </div>
        </form>
      </SettingContainer>
    </>
  )
}

export default AddAddress
