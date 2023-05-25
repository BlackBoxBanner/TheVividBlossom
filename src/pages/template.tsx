import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

function Account() {

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
      <div>test</div>
    </>
  )
}

export default Account