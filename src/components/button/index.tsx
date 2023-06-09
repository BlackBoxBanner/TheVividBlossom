import styles from "@/styles/components/button/index.module.scss";
import {ButtonHTMLAttributes} from "react";
import {Cardo, Outfit} from "next/font/google";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin", "greek"]})
const outfit = Outfit({weight: "500", style: "normal", subsets: ["latin"]})


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  font?: "Cardo" | "Outfit"
  disabled?: boolean
  dark?: boolean
  label?: boolean
  payment?: boolean
}

export function Button(props: ButtonProps) {
  const font = props.font || "Cardo"
  if (props.disabled) {
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
  const {label = false} = props

  if (props.payment) {
    return (
      <button
        className={`${styles.button} ${font == "Cardo" ? cardo.className : outfit.className} ${styles.login} ${styles.payment} ${props.dark && styles.loginDark}`} {...props}>{String(props.children)}</button>
    )
  }
  if (label) {
    return (
      <>
        <label
          className={`${styles.button} ${font == "Cardo" ? cardo.className : outfit.className} ${styles.logins}`}
          style={props.style} htmlFor={props.id}>{String(props.children)}</label>
      </>
    )
  }
  if (props.disabled) {
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
        className={`${styles.button} ${font == "Cardo" ? cardo.className : outfit.className} ${styles.login} ${props.dark && styles.loginDark}`} {...props}>{String(props.children)}</button>
    </>
  )
}