import styles from "@/styles/components/user/basket.module.scss";
import {ComponentProps, useEffect, useState} from "react";
import Image from "next/image";
import testImage from "@./public/pages/util/testImage.jpg"
import {Button, ButtonLogin} from "@/components/button";
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai"
import {outfit, outfitLabel} from "@/util/font";


export interface Items {
  name: string
  description: string
  price: number
  inventory: number
  image: string
}

interface basketItemProps extends ComponentProps<"div"> {
  items: Items
}

export function WishlistItem(props: basketItemProps) {
  const {items} = props

  function onRemove() {
    alert("Will implement this later when database has data.")
    // TODO - push delete function to remove product from basket
  }

  function onAddCart() {
    alert("Will implement this later when database has data.")
    // TODO - push push to cart function to push an item to the cart
  }

  return (
    <>
      <section className={`${styles.container}`}>
        <div className={`${styles.imageContainer}`}><Image src={items.image} alt={""} fill/></div>
        <section className={`${styles.content}`}>
          <div className={`${styles.info}`}>
            <p className={`${outfitLabel.className} ${styles.name}`}>{String(items.name)}</p>
            <p className={`${styles.description}`}>
              {String(items.description)}
            </p>
          </div>
          <div className={styles.divider}/>
          <div className={`${styles.priceContainer} ${outfitLabel.className}`}>
            <div>Price</div>
            <div className={`${styles.inventory}`}>{`$${String(items.price)}`}</div>
            <div>Unavailable</div>
            <div className={`${styles.inventory}`}>
              <div className={`${props.items.inventory > 0 ? styles.statusGreen : styles.statusRed}`}/>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={`${styles.btnAddContainer}`}>
            <ButtonLogin dark font={"Outfit"} style={{padding: " 0.5rem 1rem"}}
                         onClick={() => onAddCart()}>Add to cart</ButtonLogin>
          </div>
          <div className={styles.divider}/>
          <div className={`${styles.btnContainer} ${styles.btnN}`}>
            <ButtonLogin dark font={"Outfit"} style={{padding: " 0.5rem 1rem"}}
                         onClick={() => onRemove()}>Remove</ButtonLogin>
          </div>
        </section>
      </section>
    </>
  )
}
