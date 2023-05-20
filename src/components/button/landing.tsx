import styles from "@/styles/components/button/langingbtn.module.scss";
import {ButtonHTMLAttributes} from "react";
import {Cardo} from "next/font/google";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin"]})


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export function MenuButton(props: ButtonProps) {
  return (
    <>
      <button {...props} className={`${styles.btn} ${cardo.className} ${props.className}`}  >{props.children}</button>
    </>
  )
}