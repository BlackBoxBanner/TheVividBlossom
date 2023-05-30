import styles from "@/styles/components/display/landing/innerMenu.module.scss"
import {Cardo} from "next/font/google";
import Link from "next/link"
import {cardo} from "@/util/font";

export interface ListItem {
  onClick?: () => void;
  title: string;
  link?: string
}

interface InnerMenuProps {
  list: ListItem[]
}

function Btn(props: ListItem) {
  return (
    <>
      <Link className={styles.btn} onClick={props.onClick} href={props.link ? props.link : ""}>
        {props.title}
      </Link>
      <span className={styles.line}/>
    </>
  )
}

export default function InnerMenu(props: InnerMenuProps) {
  return (
    <>
      <div className={`${styles.container} ${cardo.className}`}>
        {props.list.map((e, key) => <Btn {...e} key={key}/>)}
      </div>
    </>
  )
}

export function ProfileBtn(props: ListItem) {
  return (
    <>
      <Link className={styles.profileBtn} onClick={props.onClick} href={""}>
        {props.title}
      </Link>
    </>
  )
}

export function Line() {
  return <span className={styles.line}/>
}