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
import {getImage as getImageApi} from "@/hook/api/image";
import {getImage} from "@/hook/getImage";
import {useEffect, useState} from "react";
import Image from "next/image";
import {BsPersonFill} from "react-icons/bs";
import {ButtonLogin} from "@/components/button";
import axios from "axios";

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
  address_line1: z.string().min(1, ""),
  address_line2: z.string().min(0, ""),
  subDistrict: z.string().min(1, ""),
  district: z.string().min(1, ""),
  province: z.string().min(1, ""),
  zipcode: z.string().min(1, ""),
})

type DataProps = z.infer<typeof schema>

function AddAddress({userid}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const {register, handleSubmit, formState: {errors}, setError, watch} = useForm<DataProps>({
    resolver: zodResolver(schema),
    defaultValues: {}
  })

  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    console.log(userid)
    await axios({
      url: "/api/user/address",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      data: {
        userid: userid,
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        subDistrict: data.subDistrict,
        district: data.district,
        province: data.province,
        zipcode: data.zipcode,
      }
    }).then(() => {
      router.push(`/user/${userid}/address`)
    }).catch(e => {
      console.error(e)
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

  // if (!user) Relocate().then()
  if (status == "loading") return <></>
  if (checkAuth()) return <></>

  return (
    <>
      <Head>
        <title>Add New Shipping Address</title>
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
      <SettingContainer title={"Add New Shipping Address"} formId={"editAccount"} onCancel={() => {
      }}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`} id={"editAccount"}>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Address line 1 *"} edit
                              placeholder={"House number, Village no, Street address"}  {...register("address_line1")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Address line 2"} edit
                              placeholder={"Village / Building name, Floor number"} {...register("address_line2")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Sub district *"} edit placeholder={"Sub District"} {...register("subDistrict")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"District *"} edit placeholder={"District"} {...register("district")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInput label={"Province *"} edit placeholder={"Province"} {...register("province")}/>
          </div>
          <div className={styles.inputContainer}>
            <AccountFormInputMask mask={"99999"} edit label={"Postal code *"}
                                  placeholder={"XXXXX"} {...register("zipcode")}/>
          </div>
        </form>
      </SettingContainer>
    </>
  )
}

export default AddAddress
