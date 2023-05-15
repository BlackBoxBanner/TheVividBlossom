import axios from 'axios';
import React from "react";

async function convertImageUrlToBase64(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url, {responseType: 'blob'});
    const imageBlob = response.data;
    const reader = new FileReader();

    return new Promise<string | null>((resolve, reject) => {
      reader.onloadend = () => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxImageSize = 800; // Specify the maximum width/height for the compressed image
          let width = image.width;
          let height = image.height;

          if (width > height && width > maxImageSize) {
            height *= maxImageSize / width;
            width = maxImageSize;
          } else if (height > maxImageSize) {
            width *= maxImageSize / height;
            height = maxImageSize;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(image, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Specify the desired image compression quality (0.7 in this example)

          resolve(compressedBase64);
        };
        image.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });
  } catch (error) {
    console.error('Error converting image URL to base64:', error);
    return null;
  }
}

function eventToUrl(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0]
  if (file) {
    return URL.createObjectURL(file);
  }
  return null
}

export {convertImageUrlToBase64, eventToUrl}