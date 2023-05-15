import {ComponentProps, Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "@/styles/components/input/input.module.scss";
import {Outfit} from "next/font/google";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

const outfit = Outfit({weight: "300", style: ["normal"], subsets: ["latin"]})
const outfitLabel = Outfit({weight: "500", style: ["normal"], subsets: ["latin"]})

interface InputProps extends ComponentProps<"input"> {
  label: string
  error?: boolean | string
}

export function Input(props: InputProps) {
  const initType = props.type
  const [password, setPassword] = useState(props.type == "password")
  const [type, setType] = useState<"password" | "text">(props.type == "password" ? "password" : "text")
  return (
    <>
      <div className={`${styles.inputContainer} ${outfit.className}`}>
        <label htmlFor={props.id} className={`${styles.label} ${outfitLabel.className}`}>{props.label}</label>
        <div>
          <input
            className={`${styles.input}  ${props.className} ${!!props.error ? styles.inputError : ""}`}
            type={type} {...props}/>
          {initType == "password" && (type == "password" ? <AiOutlineEye size={25} onClick={() => setType("text")}/> :
            <AiOutlineEyeInvisible size={25} onClick={() => setType("password")}/>)}
        </div>
      </div>
    </>
  )
}

interface ErrorMessageProps extends ComponentProps<"p"> {
}

export function ErrorMessage(props: ErrorMessageProps) {
  return <p className={`${styles.error} ${outfitLabel.className}`} {...props}>{props.children}</p>
}

interface InputErrorProps extends ComponentProps<"input"> {
  error?: string;
}

function InputError(props: InputErrorProps) {
  return (
    <div>
      <Input type="text" label={"Email"} error={!!props.error} {...props}/>
      {props.error ? <ErrorMessage>{props.error}</ErrorMessage> : <p style={{opacity: 0}}>.</p>}
    </div>
  )
}


