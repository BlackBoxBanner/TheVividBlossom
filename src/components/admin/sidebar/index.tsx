import styles from "@/styles/admin/component/sidebar.module.scss"
import {cardo, outfit, outfitLabel} from "@/util/font";
import {AiFillBell, AiFillMessage, AiOutlineBell, AiOutlineMenu, AiOutlineMessage} from "react-icons/ai";
import IconHover from "@/components/button/iconwithhover";
import Link from "next/link";
import {ComponentProps} from "react";

interface AdminSideBarProps {
  page: "dashboard" | "customer" | "order" | "product"
}

export default function AdminSideBar() {
  return (
    <>
      <div className={`${outfit.className} ${styles.sidebar}`}>
        <header className={`${cardo.className} ${styles.header}`}>
          <p>
            The Vivid Blossom
          </p>
        </header>
        <section className={`${styles.contentContainer}`}>
          <div className={styles.btnF}>
            <IconHover
              outlineIcon={<AiOutlineMenu/>}
              fillIcon={<AiOutlineMenu/>}
              size={20}
              primaryTextColor={styles.primaryTextColor}
              onClick={() => {
              }}
            />
          </div>
          <div className={`${styles.buttonContainer}`}>
            <LinkComponent href={"/admin/dashboard"} on>Dash Board</LinkComponent>
            <LinkComponent href={"/admin/customers"}>Customers</LinkComponent>
            <LinkComponent href={"/admin/orders"}>Orders</LinkComponent>
            <LinkComponent href={"/admin/products"}>Products</LinkComponent>
            <IconHover
              outlineIcon={<AiOutlineMessage/>}
              fillIcon={<AiFillMessage/>}
              size={23}
              primaryTextColor={styles.primaryTextColor}
              onClick={() => {
              }}
            />
            <IconHover
              outlineIcon={<AiOutlineBell/>}
              fillIcon={<AiFillBell/>}
              size={23}
              primaryTextColor={styles.primaryTextColor}
              onClick={() => {
              }}
            />
          </div>
        </section>
        <footer className={`${styles.footer} ${outfit.className}`}>
          <section className={`${styles.role}`}>
            Admin
          </section>
          <section>
            Phurichaya Jinthanawong
          </section>
        </footer>
      </div>
    </>
  )
}

interface LinkComponentProps extends ComponentProps<typeof Link> {
  on?: boolean
}

function LinkComponent(props: LinkComponentProps) {
  const {on} = props
  return <Link
    className={`${outfitLabel.className} ${styles.link} ${on && styles.active}`} {...props}>{props.children}</Link>
}