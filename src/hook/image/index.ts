interface BreakDownData {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
  text8: string;
  text9: string;
  text10: string;
  text11: string;
  text12: string;
  text13: string;
  text14: string;
  text15: string;
  text16: string;
}

interface BreakDownText {
  prefix: string; // data:image/jpeg;base64,
  data: BreakDownData;
}

interface BackToOneProps {
  textData: BreakDownText;
}

export function breakImage(imageBase64: string): BreakDownText {
  const prefix = getPrefix(imageBase64)
  const noPrefixImageBase64 = removePrefix(imageBase64, prefix)
  const dividedImage = divideText(noPrefixImageBase64);

  return {
    prefix: getPrefix(imageBase64),
    data: {
      text1: dividedImage[0],
      text2: dividedImage[1],
      text3: dividedImage[2],
      text4: dividedImage[3],
      text5: dividedImage[4],
      text6: dividedImage[5],
      text7: dividedImage[6],
      text8: dividedImage[7],
      text9: dividedImage[8],
      text10: dividedImage[9],
      text11: dividedImage[10],
      text12: dividedImage[11],
      text13: dividedImage[12],
      text14: dividedImage[13],
      text15: dividedImage[14],
      text16: dividedImage[15],
    },
  };
}

export function combineImage(props: BreakDownText): string {
  const {prefix, data} = props;
  const combinedImage = Object.values(data).join('');

  return prefix + combinedImage;
}

// Helper functions

function divideText(image: string): string[] {
  const chunkSize = Math.ceil(image.length / 16);
  const dividedImage = [];

  for (let i = 0; i < image.length; i += chunkSize) {
    dividedImage.push(image.slice(i, i + chunkSize));
  }

  // Pad the last chunk if it's smaller than chunkSize
  if (dividedImage.length < 16) {
    const lastChunk = dividedImage[dividedImage.length - 1];
    const padding = "=".repeat(chunkSize - lastChunk.length);
    dividedImage[dividedImage.length - 1] = lastChunk + padding;
  }

  return dividedImage;
}

function getPrefix(imageBase64: string): string {
  return imageBase64.slice(0, imageBase64.indexOf(',') + 1);
}

function removePrefix(base64String: string, prefix: string): string {
  return base64String.replace(prefix, '');
}
