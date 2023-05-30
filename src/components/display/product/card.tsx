import {ComponentProps, useEffect, useState} from "react";
import styles from "@/styles/components/display/product/card.module.scss";
import Image from "next/image";
import testImage from "@./public/pages/util/testImage.jpg";
import {EbGaramond, outfit, outfitLabel} from "@/util/font";
import IconHover from "@/components/button/iconwithhover";
import {AiFillHeart, AiOutlineHeart, AiOutlineShopping, AiTwotoneShopping} from "react-icons/ai";
import {ProductStatus} from "@prisma/client";
import axios from "axios";
import {combineImage} from "@/hook/image";


export interface ProductType {
  id: string
  flowerName: string
  price: number
  description: string
  status: ProductStatus,
  image: string
}

interface ProductDisplayProps extends ComponentProps<"div"> {
  product: ProductType
  userId: string | undefined | null
}

export function ProductDisplay(props: ProductDisplayProps) {

  const [status, setStatus] = useState<"Available" | "Unavailable">("Available")

  useEffect(() => {
    function showStatus() {
      switch (props.product.status) {
        case "AVAILABLE":
          return "Available";
        case "OUT_OF_STOCK":
          return "Unavailable";
        case "LOW_STOCK":
          return "Available";
        case "ARCHIVED":
          return "Unavailable";
      }
    }

    setStatus(showStatus())
  }, [props.product.status])

  async function addBasket() {
    await axios({
      url: "/api/product",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      data: {
        userId: props.userId,
        productId: props.product.id
      }
    }).then(() => {
    }).catch(e => {
      console.error(e)
    })
  }


  return (
    <>
      <section className={styles.card}>
        <div className={styles.imageContainer}>
          <Image src={props.product.image} alt={"Product Image"} fill className={styles.image}/>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.leftContent}>
            <div className={styles.textContent}>
              <div className={`${outfitLabel.className} ${styles.flowerName}`}>
                {props.product.flowerName}
              </div>
              <div className={`${styles.description} ${outfit.className}`}>
                {props.product.description}
              </div>
            </div>
            <div className={`${styles.statusContainer} ${outfit.className}`}>
              <div className={styles.container}>
                <div>
                  {status}
                </div>
                <div className={styles.statusIcon}>
                  <span
                    className={`${styles.status} ${status == "Available" ? styles.available : styles.unavailable}`}/>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={`${styles.price} ${EbGaramond.className}`}>
              {`$${props.product.price}`}
            </div>
            <div className={styles.icons}>
              <div>
                <IconHover
                  onClick={() => {
                    // TODO - push function to push to wishlist
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
                    addBasket().then()
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