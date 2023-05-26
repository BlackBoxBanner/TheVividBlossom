import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import prisma from "@/lib/prisma";
import {User} from ".prisma/client";


export const getServerSideProps: GetServerSideProps<{ user: User | null }, {
  userid: string
}> = async (context) => {
  const userid = context.params?.userid
  const user = await prisma.user.findUnique({
    where: {
      id: userid
    },
  })
  return {
    props: {user}
  }
};

function Template({}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter()

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
    </>
  )
}

export default Template