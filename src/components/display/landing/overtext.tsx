import styles from "@/styles/components/display/landing/overtext.module.scss";
import {useEffect, useState} from "react";
import {timeout} from "@/util/timeout"
import {getRandomArbitrary} from "@/util/randomnumber";
import {Cardo, Outfit} from "next/font/google";

const outfit = Outfit({weight: "400", style: "normal", subsets: ["latin"]})
const cardo = Cardo({weight: "400", subsets: ["greek"], style: "italic"})

interface OverTextProps {
  content: {
    set1: string;
    set2: string;
  };
  colors: { set1: string, set2: string }[]
  timePerLoop: number;
  state: number
}

function OverText(props: OverTextProps) {
  const [color, setColor] = useState<{ set1: string; set2: string }>(props.colors[0]);
  useEffect(() => {
    async function changeColor() {
      setColor(prevColor => ({...prevColor, set1: props.colors[props.state].set1}));
      await timeout(getRandomArbitrary(500, 1500));
      setColor(prevColor => ({...prevColor, set2: props.colors[props.state].set2}));
    }

    changeColor().then(() => {
    });
  }, [props.colors, props.state]);

  return (
    <div className={`${styles.overText} ${cardo.className}`}>
      <div
        className={styles.text1}
        style={{color: color.set1}}
      >
        {props.content.set1}
      </div>
      <div
        className={styles.text2}
        style={{color: color.set2}}
      >
        {props.content.set2}
      </div>
    </div>
  )
}

export default OverText