import styles from "@/styles/components/button/index.module.scss";
import {ButtonHTMLAttributes} from "react";
import {Cardo, Outfit} from "next/font/google";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin", "greek"]})
const outfit = Outfit({weight: "500", style: "normal", subsets: ["latin"]})


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  font?: "Cardo" | "Outfit"
  disable?: boolean
}

export function Button(props: ButtonProps) {
  const font = props.font || "Cardo"
  if (props.disable) {
    return (
      <>
        <div
          className={`${styles.button} ${font == "Cardo" ? cardo.className : outfit.className} ${styles.disable}`}
          style={props.style}>
          {String(props.children)}
        </div>
      </>
    )
  }
  return (
    <>
      <button
        className={`${styles.button} ${font == "Cardo" ? cardo.className : outfit.className}`} {...props}>{String(props.children).toUpperCase()}</button>
    </>
  )
}

export function ButtonLogin(props: ButtonProps) {
  const font = props.font || "Cardo"
  if (props.disable) {
    return (
      <>
        <button
          className={`${styles.button} ${font == "Cardo" ? cardo.className : outfit.className} ${styles.logins} ${styles.disable}`}
          style={props.style}>{String(props.children)}</button>
      </>
    )
  }
  return (
    <>
      <button
        className={`${styles.button} ${font == "Cardo" ? cardo.className : outfit.className} ${styles.logins} `} {...props}>{String(props.children)}</button>
    </>
  )
}