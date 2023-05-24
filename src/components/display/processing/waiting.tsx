import styles from "@/styles/components/display/processing/waiting.module.scss"
import Image from "next/image"
import waiting from "@./public/pages/util/waiting_image.png"
import {Cardo} from "next/font/google";

const cardo = Cardo({weight: "400", subsets: ["greek"], style: "italic"})

interface WaitingContentProps {
  title: string
}

export function WaitingContent(props: WaitingContentProps) {
  return (
    <>
      <div className={`${styles.container} ${cardo.className}`}>
        <div className={styles.title}>The Vivid Blossom</div>
        <div className={styles.devLine}/>
        <div className={styles.body}>
          <div className={styles.content}>
            <p>
              Your {props.title} is currently being processed.
            </p>
            Please wait momentarily.
          </div>
          <div className={styles.imageContainer}>
            <Image src={waiting} alt={""} fill className={styles.image}/>
          </div>
        </div>
      </div>
    </>
  )
}