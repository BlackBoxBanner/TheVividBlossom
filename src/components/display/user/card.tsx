import {ComponentProps} from "react";
import styles from "@/styles/components/user/card.module.scss";
import {outfitLabel} from "@/util/font";
import {ButtonLogin} from "@/components/button";
import Image from "next/image";
import mastercard from "@./public/pages/register/mastercard.svg";

interface CardContainerProps extends ComponentProps<"div"> {
  type: "card" | "address"
  default?: boolean
}

export function CardContainer(props: CardContainerProps) {
  const removeText = `Remove ${props.type}`
  return (
    <>
      <div className={styles.card}>
        {props.children}
        {props.default && <div className={`${styles.default} ${outfitLabel.className}`}>Default</div>}
        <span className={styles.cardHover}/>
        <section className={styles.hoverContent}>
          <ButtonLogin dark font={"Outfit"} payment style={{width: "11rem"}}>
            Set as default
          </ButtonLogin>
          <ButtonLogin dark font={"Outfit"} payment style={{width: "11rem"}}>
            Review details
          </ButtonLogin>
          {
            !props.default &&
              <ButtonLogin font={"Outfit"} payment style={{width: "11rem"}}>
                {removeText}
              </ButtonLogin>
          }
        </section>
      </div>
    </>
  )
}

export function AddCardButton(props: ComponentProps<"button">) {
  return (
    <>
      <button className={`${styles.card} ${styles.addCard}`} onClick={props.onClick}>
        <span>
          <svg
            width="58"
            height="59"
            viewBox="0 0 58 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.closeIcon}
          >
            <path
              d="M0.646484 57.215L57.215 0.646484M57.2151 57.9221L0.646546 1.35359"
              stroke="#FDFCF5"
            />
          </svg>
        </span>
      </button>
    </>
  )
}

interface CardDetailProps extends ComponentProps<"div"> {
  name: string
  cardNo: string
  provider: string
  expDate: string
}

export function CardDetail(props: CardDetailProps) {
  const [fname, lname] = props.name.split(" ")
  return (
    <>
      <div className={styles.cardDetailContainer}>
        {/*left*/}
        <section className={styles.leftContainer}>
          {/*name*/}
          <article className={`${outfitLabel.className} ${styles.name}`}>
            {/*fname*/}
            <p>{fname}</p>
            {/*lname*/}
            <p className={styles.lastname}>{lname}</p>
          </article>
          {/*card number*/}
          <p className={`${outfitLabel.className} ${styles.cardNo}`}>{String(props.cardNo)}</p>
        </section>
        {/* right */}
        <section className={styles.rightContainer}>
          {/*provider*/}
          <section>
            {props.provider == "MasterCard" &&
                <Image src={mastercard} alt={"mastercard"} className={styles.cardImage}/>}
            {/*{props.provider == "MasterCard" && <Image src={visa} alt={"visa"} className={`${styles.cardImage} ${styles.visa}`}/>}*/}
          </section>
          <section>
            {/*exp date*/}
            <p className={`${outfitLabel.className} ${styles.cardNo}`}>{props.expDate}</p>
          </section>
        </section>
      </div>
    </>
  )
}