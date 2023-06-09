import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {AdminContainer, ContentContainer} from "@/components/admin/container";
import AdminSideBar from "@/components/admin/sidebar";
import {Button} from "@/components/button";

function AdminDashboard() {

  // Don't touch
  const router = useRouter()
  const {status, data: session, update} = useSession()

  function checkAuth() {
    if (status == "unauthenticated") {
      router.push("/").then()
      return true
    }
    if (session?.user?.email != undefined) {
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
        <title>Admin - orders</title>
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
      <AdminContainer>
        <AdminSideBar page={"order"}/>
        <ContentContainer>

        </ContentContainer>
      </AdminContainer>
    </>
  )
}

export default AdminDashboard