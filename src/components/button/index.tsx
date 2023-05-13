import styles from "@/styles/components/button/index.module.scss";
import {ButtonHTMLAttributes} from "react";
import {Cardo, Outfit} from "@next/font/google";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin", "greek"]})
const outfit = Outfit({weight: "400", style: "normal", subsets: ["latin"]})


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    font?: "Cardo" | "Outfit"
}

export function Button(props: ButtonProps) {
    const font = props.font || "Cardo"
    return (
        <>
            <button
                className={`${styles.button} ${font == "Cardo" ? cardo.className : outfit.className}`}  {...props}>{String(props.children).toUpperCase()}</button>
        </>
    )
}