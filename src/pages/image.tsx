import {ChangeEvent, useEffect, useState} from "react";
import {convertImageUrlToBase64, eventToUrl} from "@/hook/urltobase64";

export default function Image() {
  const [image, setImage] = useState<string>()

  async function imageHandler(event: ChangeEvent<HTMLInputElement>) {
    const url = eventToUrl(event)!
    console.log(url)
    const dataImage = await convertImageUrlToBase64(url)
    setImage(dataImage!)
  }

  useEffect(() => {
    // return console.log(image)
  }, [image])

  return (
    <>
      <div>
        <input type="file" onChange={imageHandler}/>
        {image && <img src={image} alt=""/>}
      </div>
    </>
  )
}