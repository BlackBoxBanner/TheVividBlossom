import {ComponentProps} from "react";
import styles from "@/styles/components/display/landing/showimage.module.scss";
import Image from "next/image";

import image1 from "@./public/landing/image1.jpg"
import image2 from "@./public/landing/image2.jpg"
import image3 from "@./public/landing/image3.jpg"
import image4 from "@./public/landing/image4.jpg"
import image5 from "@./public/landing/image5.jpg"

interface ShowSetsProps extends ComponentProps<"div"> {
  stage: number,
  setsNumber: number
}

function ShowSets(props: ShowSetsProps) {
  return (
    <div className={`${styles.itemAbsolute}`}>
      <div className={`${styles.imageContainer} ${props.className}`}
           style={{opacity: props.stage == props.setsNumber - 1 ? 1 : 0}}>
        {props.children}
      </div>

    </div>
  )
}

export default function ImageContainer(props: { stage: number }) {
  return (
    <>
      <div className={styles.content}>
        <ShowSets stage={props.stage} setsNumber={1}>
          <Image
            style={{paddingRight: "3rem"}}
            fill
            src={image1}
            alt={"flower1"}
            sizes={"3000px"}
          />
        </ShowSets>
        <ShowSets stage={props.stage} setsNumber={2}>
          <div className={styles.containerImage2}>
            <Image
              className={styles.image1}
              src={image2}
              alt={"flower2"}
              sizes={"3000px"}
            />
            <Image
              className={styles.image2}
              src={image3}
              alt={"flower3"}
              sizes={"3000px"}
            />
          </div>
        </ShowSets>
        <ShowSets stage={props.stage} setsNumber={3}>
          <div className={styles.containerImage3}>
            <div className={styles.imageLeftContainer}>
              <Image
                className={styles.image3}
                src={image4}
                alt={"flower4"}
                sizes={"3000px"}
              />
            </div>
            <div className={styles.imageRightContainer}>
              <Image
                className={styles.image4}
                src={image5}
                alt={"flower5"}
                sizes={"3000px"}
              />
            </div>
          </div>
        </ShowSets>
      </div>
    </>
  )
}