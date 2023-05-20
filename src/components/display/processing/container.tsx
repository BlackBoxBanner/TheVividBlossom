import {ReactNode, useState} from "react";
import styles from "@/styles/components/display/processing/container.module.scss"

export interface ProcessingProps {
  children?: ReactNode
  // title: string
}

export function useProcessing() {
  const [state, setState] = useState(false)

  function Processing(props: ProcessingProps) {
    return (
      <>
        <div className={`${!state && styles.default}`}>
          <div className={`${styles.processing}`}/>
          <div className={`${styles.content}`}>
            {props.children}
          </div>
          <style jsx global>
            {`
              html {
                overflow: ${state ? "hidden" : "initial"};
              }
            `}
          </style>
        </div>
      </>
    )
  }

  return {state, setState, Processing}
}