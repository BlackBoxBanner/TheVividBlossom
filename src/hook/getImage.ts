import {convertImageUrlToBase64, eventToUrl} from "@/hook/urltobase64";

export async function getImage(e: File) {
  const imageUrl = eventToUrl(e)
  return await convertImageUrlToBase64(imageUrl!)
}