import styles from "@/styles/components/display/landing/contact.module.scss"
import {Cardo} from "next/font/google";
import {ComponentProps, Dispatch, SetStateAction, useState} from "react";
import {Line, ProfileBtn} from "@/components/display/landing/innerMenu";
import {signOut} from "next-auth/react";
import OverMenu from "@/components/display/landing/overlaymenu";
import {delay} from "@/hook/delay";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin", "greek"]})

interface ContactProps extends ComponentProps<"div"> {
  setOverMenu: Dispatch<SetStateAction<boolean>>
  setAccountSetting: Dispatch<SetStateAction<boolean>>
}

export function ProfileMenu(props: ContactProps) {
  return (
    <>
      <div className={`${styles.main} ${cardo.className}`}>
        <div className={styles.profileContainer}>
          <Line/>
          <ProfileBtn title={"Account Settings"} onClick={async () => {
            props.setAccountSetting(true)
            await delay(1000)
            props.setOverMenu(false)
          }}/>
          <Line/>
          <ProfileBtn title={"My Order"} onClick={() => alert("My order not implemented yet")}/>
          <Line/>
          <ProfileBtn title={"Log out"} onClick={() => signOut()}/>
          <Line/>
        </div>
      </div>
    </>
  )
}