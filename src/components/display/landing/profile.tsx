import styles from "@/styles/components/display/landing/contact.module.scss"
import {Cardo} from "next/font/google";
import {ComponentProps} from "react";
import {Line, ProfileBtn} from "@/components/display/landing/innerMenu";
import {signOut} from "next-auth/react";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin", "greek"]})

interface ContactProps extends ComponentProps<"div"> {
}

export function ProfileMenu(props: ContactProps) {
  return (
    <>
      <div className={`${styles.main} ${cardo.className}`}>
        <div className={styles.profileContainer}>
          <Line/>
          <ProfileBtn title={"Account Settings"}/>
          <Line/>
          <ProfileBtn title={"Log out"} onClick={() => signOut()}/>
          <Line/>
        </div>
      </div>
    </>
  )
}