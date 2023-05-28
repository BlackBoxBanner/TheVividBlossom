import {ComponentProps} from "react";
import styles from "@/styles/components/display/product/card.module.scss";
import Image from "next/image";
import testImage from "@./public/pages/util/testImage.jpg";
import {EbGaramond, outfit, outfitLabel} from "@/util/font";
import IconHover from "@/components/button/iconwithhover";
import {AiFillHeart, AiOutlineHeart, AiOutlineShopping, AiTwotoneShopping} from "react-icons/ai";

interface ProductDisplayProps extends ComponentProps<"div"> {
  flowerName: string
  price: number
  description: string
  status: boolean
}

export function ProductDisplay(props: ProductDisplayProps) {
  return (
    <>
      <section className={styles.card}>
        <div className={styles.imageContainer}>
          <Image src={testImage} alt={"Product Image"} fill className={styles.image}/>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.leftContent}>
            <div className={styles.textContent}>
              <div className={`${outfitLabel.className} ${styles.flowerName}`}>
                {props.flowerName}
              </div>
              <div className={`${styles.description} ${outfit.className}`}>
                {props.description}
              </div>
            </div>
            <div className={`${styles.statusContainer} ${outfit.className}`}>
              <div className={styles.container}>
                <div>
                  {props.status ? "Available" : "Unavailable"}
                </div>
                <div className={styles.statusIcon}>
                  <span className={`${styles.status} ${props.status ? styles.available : styles.unavailable}`}/>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={`${styles.price} ${EbGaramond.className}`}>
              {`$${props.price}`}
            </div>
            <div className={styles.icons}>
              <div>
                <IconHover
                  onClick={() => {
                  }}
                  outlineIcon={<AiOutlineHeart/>}
                  fillIcon={<AiFillHeart/>}
                  size={25}
                  primaryTextColor={styles.primaryTextColor}
                />
              </div>
              <div>
                <IconHover
                  onClick={() => {
                  }}
                  outlineIcon={<AiOutlineShopping/>}
                  fillIcon={<AiTwotoneShopping/>}
                  size={25}
                  primaryTextColor={styles.primaryTextColor}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}