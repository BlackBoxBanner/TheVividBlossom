import styles from "@/styles/components/display/register/formcontainer.module.scss";
import {ComponentProps} from "react";
import {Outfit} from "next/font/google";

const outfitLarge = Outfit({weight: "500", style: "normal", subsets: ["latin"]})

interface FormContainerProps extends ComponentProps<"div"> {
  header: string
}

export function FormContainer(props: FormContainerProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.formHeader} ${outfitLarge.className}`}>
        {props.header}
      </div>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
}