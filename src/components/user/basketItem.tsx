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
  quantity: number
  image: string
}

interface basketItemProps extends ComponentProps<"div"> {
  items: Items
}

export function BasketItem(props: basketItemProps) {
  const {items} = props

  const [count, setCount] = useState(items.quantity)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateCount = () => {
      console.log('Updating count:', count);
      //TODO - update function goes here.

    };

    const handleInputChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateCount, 2000);
    };

    handleInputChange()

    return () => {
      clearTimeout(timeoutId);
    };
  }, [count]);

  function onRemove() {
    alert("Will implement this later when database has data.")
  // TODO - push delete function to remove product from basket
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
            <div>{`$${String(items.price)}`}</div>
            <div>Quantity</div>
            <div className={`${styles.quantity}`}>
              <AiOutlinePlusCircle onClick={() => setCount(e => e > 0 ? e + 1 : e)}/>
              <p style={{userSelect: "none", msUserSelect: "none"}}>
                {String(count)}
              </p>
              <AiOutlineMinusCircle onClick={() => setCount(e => e > 1 ? e - 1 : e)}/>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={`${styles.btnContainer}`}>
            <ButtonLogin dark font={"Outfit"} style={{padding: " 0.5rem 1rem"}}
                         onClick={() => onRemove()}>Remove</ButtonLogin>
          </div>
        </section>
      </section>
    </>
  )
}
