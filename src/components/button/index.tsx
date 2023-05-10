import styles from "@/styles/components/button/index.module.scss";
import {ButtonHTMLAttributes} from "react";
import {Cardo} from "@next/font/google";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin", "greek"]})


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button(props: ButtonProps) {
	return (
		<>
			<button className={`${styles.button} ${cardo.className}`}  {...props}>{String(props.children).toUpperCase()}</button>
	</>
)
}