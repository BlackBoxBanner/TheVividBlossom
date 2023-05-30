import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import prisma from "@/lib/prisma";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "@/styles/pages/user/user.module.scss"
import SettingContainer from "@/components/display/user/settingContainer";
import {
  AccountFormInput,
  AccountFormInputMask, SettingLabel,
} from "@/components/input";
import {getImage as getImageApi, updateImageHandler} from "@/hook/api/image";
import {getImage} from "@/hook/getImage";
import {useEffect, useState} from "react";
import Image from "next/image";
import {BsPersonFill} from "react-icons/bs";
import {ButtonLogin} from "@/components/button";
import {userUpdateHandler} from "@/hook/api/user";
import axios from "axios";

interface ServerSideProps {
  id: string
  dob: string
  email: string
  first_name: string
  last_name: string
  telephone: string
  image: string
}

export const getServerSideProps: GetServerSideProps<{ user: ServerSideProps | null }, {
  userid: string
}> = async (context) => {
  const userid = context.params?.userid
  const user = await prisma.user.findUnique({
    where: {
      id: userid
    },
  })
  const image = await getImageApi(user?.email!)

  return {
    props: {
      user: user ? {
        id: user?.id!,
        dob: String(user?.dob!),
        email: user?.email!,
        first_name: user?.first_name!,
        last_name: user?.last_name!,
        telephone: user?.telephone!,
        image: image!
      } : null
    }
  }
};

const schema = z.object({
  id: z.string(),
  dob: z.string().min(1, "Invalid birthdate").optional().refine((value) => {
    const date = value?.split(" / ")
    if (parseInt(date![0]) < 0) return
    if (parseInt(date![0]) > 31) return
    if (parseInt(date![1]) < 0) return
    if (parseInt(date![1]) > 12) return
    if (parseInt(date![2]) < 1500) return
    if (parseInt(date![2]) > 3000) return
    return true
  }, "Invalid birthdate format (DD / MM / YYYY)"),
  email: z.string().min(1, ""),
  first_name: z.string().min(1, ""),
  last_name: z.string().min(1, ""),
  telephone: z.string().min(1, ""),
  image: z.any(),
})

type DataProps = z.infer<typeof schema>

function Account({user}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const initDate = {
    day: new Date(user?.dob ? user?.dob : "").getDate(),
    month: new Date(user?.dob ? user?.dob : "").getMonth() + 1,
    year: new Date(user?.dob ? user?.dob : "").getFullYear()
  }

  const {register, handleSubmit, formState: {errors}, setError, watch} = useForm<DataProps>({
    resolver: zodResolver(schema),
    values: {
      id: user?.id!,
      email: user?.email!,
      dob: `${initDate.day} / ${String(initDate.month).length == 1 ? `0${initDate.month}` : initDate.month} / ${initDate.year}`,
      first_name: user?.first_name!,
      last_name: user?.last_name!,
      telephone: user?.telephone!,
      image: user?.image
    }
  })

  const [image, setImage] = useState("")

  useEffect(() => {
    const subscription = watch(async (value) => {
      if (value.image[0] && typeof value.image == "object") {
        getImage(value.image[0]).then((e) => {
          setImage(e!)
        })
      } else {
        setImage(user?.image!)
      }
    });
    return () => subscription.unsubscribe();
  }, [user?.image, watch])

  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    console.log(data);

    await axios({
      url: "/api/user/updateinfo",
      method: "PATCH",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      data: {
        id: user?.id!,
        dob: data.dob,
        email: user?.email!,
        first_name: data.first_name,
        last_name: data?.last_name,
        telephone: data?.telephone,
      }
    }).then().catch(e => {
      console.error(e)
    })

    await axios({
      url: "/api/user/updateimage",
      method: "PATCH",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      data: {
        email: user?.email!,
        image
      }
    })
  }

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
        <title>Edit account</title>
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
      <SettingContainer title={"Edit Account"} formId={"editAccount"} onCancel={() => {
      }}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`} id={"editAccount"}>
          <div className={styles.inputContainer} style={{padding: "0.75rem 2.5rem"}}>
            <div className={styles.imageContainer}>
              <SettingLabel id={"profileImage"} label={"Profile Image"}/>
              <div className={styles.imageInputContainer}>
                {image ?
                  <div style={{position: "relative", height: "100%", width: "100%"}}>
                    <Image src={image ? image : user?.image!} className={styles.image} alt={"user profile"} fill
                           style={{objectFit: "cover"}}/>
                  </div> :
                  <BsPersonFill size={70} className={styles.person}/>}

                <input type="file" style={{display: "none"}} id={"image"} {...register("image")} accept="image/*"
                       className={styles.imageInput}/>
                <span/>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <ButtonLogin dark font={"Outfit"} onClick={() => setImage("")}>Remove Image</ButtonLogin>
              <ButtonLogin dark font={"Outfit"} label id={"image"} style={{fontStyle: "1rem"}}>Change
                Image</ButtonLogin>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <AccountFormInput label={"First Name *"}  {...register("first_name")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Last Name *"}  {...register("last_name")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask mask={"999 999 9999"} label={"Phone Number"} {...register("telephone")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask mask={"99 / 99 / 9999"} label={"Birthdate"} {...register("dob")}/>
          </div>
        </form>
      </SettingContainer>
    </>
  )
}

export default Account
