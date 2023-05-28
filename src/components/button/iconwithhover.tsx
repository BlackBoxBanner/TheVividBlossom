import React, {useState} from 'react';
import styles from "@/styles/components/button/iconbtn.module.scss"

interface IconHoverProps {
  outlineIcon: React.ReactElement;
  fillIcon: React.ReactElement;
  size: number;
  primaryTextColor: string;
  onClick: () => void
}

const IconHover: React.FC<IconHoverProps> = ({outlineIcon, fillIcon, size, primaryTextColor, onClick}) => {
  const [icon, setIcon] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseOver={() => setIcon(true)}
      onMouseLeave={() => setIcon(false)}
      onClick={onClick}
    >
      {React.cloneElement(outlineIcon, {
        size: size.toString(),
        style: {
          opacity: icon ? '0' : '1',
          transition: 'ease-in-out 150ms',
        },
      })}
      <div style={{position: 'absolute', top: 0, left: 0}}>
        {React.cloneElement(fillIcon, {
          size: size.toString(),
          fill: primaryTextColor,
          style: {
            opacity: icon ? '1' : '0',
            transition: 'ease-in-out 150ms',
          },
        })}
      </div>
    </div>
  );
};

export default IconHover
