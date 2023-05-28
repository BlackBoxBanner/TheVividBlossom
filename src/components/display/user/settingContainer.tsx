import styles from "@/styles/components/user/user.module.scss";
import {cardo} from "@/util/font";
import {ButtonLogin} from "@/components/button";
import {ComponentProps} from "react";
import {useRouter} from "next/router";
import * as string_decoder from "string_decoder";

interface SettingContainerProps extends ComponentProps<"div"> {
  title: string
  formId?: string
  onCancel?: () => void
}

function SettingContainer(props: SettingContainerProps) {
  const router = useRouter()
  return (
    <>
      <section style={{display: "flex", minHeight: "100vh", flexDirection: "column", justifyContent: "space-between"}}>

        <div>
          <header className={`${styles.header} ${cardo.className}`}>
            <p>{props.title}</p>
            <span/>
            <button
              className={`${styles.closeButton}`}
              onClick={() => router.push("/")}
            >
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
            </button>
          </header>
          <main style={{height: "auto"}}>
            <article style={{height: "auto"}}>
              {props.children}
            </article>
          </main>
        </div>
        {props.formId &&
            <footer className={`${styles.footer}`}>
                <div>
                    <ButtonLogin font={"Outfit"} type={"reset"} onClick={props.onCancel} dark style={{width: "100%"}}>
                        Cancel
                    </ButtonLogin>
                    <ButtonLogin font={"Outfit"} type={"submit"} style={{width: "100%"}} form={props.formId}>
                        Save
                    </ButtonLogin>
                </div>
            </footer>}
      </section>
    </>
  )
}

export default SettingContainer

interface PageLayoutProps extends ComponentProps<"div"> {
  title: string
  button?: {
    btn1: {
      title: string,
      function: () => void
    },
    btn2: {
      title: string,
      function: () => void
    }
  }
}

export function PageLayout(props: PageLayoutProps) {
  const router = useRouter()
  return (
    <>
      <section
        style={{display: "flex", height: "100vh", maxHeight: "100vh", flexDirection: "column", position: "relative"}}>
        <header className={`${styles.header} ${cardo.className}`}>
          <p>{props.title}</p>
          <span/>
          <button
            className={`${styles.closeButton}`}
            onClick={() => router.push("/")}
          >
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
          </button>
        </header>
        <div style={{height: "100%", position: "relative"}}>
          {props.children}
        {props.button &&
            <footer className={`${styles.footer}`}>
                <div>
                    <ButtonLogin font={"Outfit"} onClick={() => {
                      props.button?.btn1.function()
                    }} dark
                                 style={{width: "100%"}}>
                      {props.button.btn1.title}
                    </ButtonLogin>
                    <ButtonLogin font={"Outfit"} onClick={() => {
                      props.button?.btn2.function()
                    }} style={{width: "100%"}}>
                      {props.button.btn1.title}
                    </ButtonLogin>
                </div>
            </footer>}
        </div>
      </section>
    </>
  )
}