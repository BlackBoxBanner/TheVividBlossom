import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

function AdminDashboard() {

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
      <div>
        test
      </div>
    </>
  )
}

export default AdminDashboard