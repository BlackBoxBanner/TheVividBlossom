import React, {useState} from 'react';

interface IconHoverProps {
  outlineIcon: React.ReactElement;
  fillIcon: React.ReactElement;
  size: number;
  primaryTextColor: string;
}

const IconHover: React.FC<IconHoverProps> = ({outlineIcon, fillIcon, size, primaryTextColor}) => {
  const [icon, setIcon] = useState(false);

  return (
    <div
      style={{position: 'relative'}}
      onMouseOver={() => setIcon(true)}
      onMouseLeave={() => setIcon(false)}
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
