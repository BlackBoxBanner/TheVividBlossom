import {ComponentProps} from "react";
import styles from "@/styles/components/button/profile.module.scss"
import Image from "next/image"
import {BsPersonFill} from "react-icons/bs";

interface Profile extends ComponentProps<"button"> {
  email: string
  image?: string
}

export function Profile(props: Profile) {


  return (
    <>
      <button onClick={() => props.onClick}>
        <div className={styles.imageContailer} onClick={() => props.onClick}>
          {props.image ? <Image src={props.image} alt={"User profile"} fill onClick={() => props.onClick}
                                style={{objectFit: "cover"}}/> :
            <BsPersonFill size={25} className={styles.person}/>
          }
        </div>
      </button>
    </>
  )
}