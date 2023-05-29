import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import AdminContainer from "@/components/admin/container";
import AdminSideBar from "@/components/admin/sidebar";

function AdminDashboard() {

  // Don't touch
  const router = useRouter()
  const {status, data: session} = useSession()

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
        <title>Admin - dashboard</title>
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
        <AdminSideBar/>
        <div style={{
          minHeight: "100%",
          height: "fit-content",
          width: "100%",
          backgroundColor: "aliceblue",
          display: "block",
          padding: "1rem"
        }}>
          {/*<div style={{height: "200vh", width: "100%", backgroundColor: "wheat", display: "block"}}>as</div>*/}
        </div>
      </AdminContainer>
    </>
  )
}

export default AdminDashboard