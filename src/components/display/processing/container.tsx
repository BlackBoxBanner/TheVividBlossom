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
      <div className={`${styles.processing} ${!state && styles.default}`}>
        {props.children}
        <button onClick={() => setState(false)} style={{opacity: 0}}>quit</button>
        <style jsx global>
          {`
            html {
              overflow: ${state ? "hidden" : "initial"};
            }
          `}
        </style>
      </div>
    )
  }

  return {state, setState, Processing}
}