import styles from "@/styles/components/button/langingbtn.module.scss";
import {ButtonHTMLAttributes} from "react";
import {Cardo} from "next/font/google";

const cardo = Cardo({weight: "400", style: "italic", subsets: ["latin", "greek"]})


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export function MenuButton(props: ButtonProps) {
	return (
		<>
			<button className={`${styles.btn} ${cardo.className}`}  {...props}>{props.children}</button>
		</>
	)
}