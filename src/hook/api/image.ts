import {breakImage, combineImage} from "@/hook/image";
import prisma from "@/lib/prisma";

export async function uploadImage(image?: string | null) {
  if (!image) return {id: null}
  const imageData = breakImage(image)
  // props.user.image
  return await prisma.image.create({
    data: {
      prefix: imageData.prefix,
      data1: imageData.data.text1,
      data2: imageData.data.text2,
      data3: imageData.data.text3,
      data4: imageData.data.text4,
      data5: imageData.data.text5,
      data6: imageData.data.text6,
      data7: imageData.data.text7,
      data8: imageData.data.text8,
      data9: imageData.data.text9,
      data10: imageData.data.text10,
      data11: imageData.data.text11,
      data12: imageData.data.text12,
      data13: imageData.data.text13,
      data14: imageData.data.text14,
      data15: imageData.data.text15,
      data16: imageData.data.text16,
    },
    select: {
      id: true
    }
  })
}

interface updateImageProps {
  imageId: string,
  image?: string | null,
}

export async function updateImage(props: updateImageProps) {

  if (!props.imageId) return
  if (!props.image) return (
    await prisma.image.update({
      where: {
        id: props.imageId
      },
      data: {}
    })
  )
  console.log("updating image")

  const imageData = breakImage(props.image)
  // props.user.image
  return (await prisma.image.update({
    where: {
      id: props.imageId
    },
    data: {
      prefix: imageData.prefix,
      data1: imageData.data.text1,
      data2: imageData.data.text2,
      data3: imageData.data.text3,
      data4: imageData.data.text4,
      data5: imageData.data.text5,
      data6: imageData.data.text6,
      data7: imageData.data.text7,
      data8: imageData.data.text8,
      data9: imageData.data.text9,
      data10: imageData.data.text10,
      data11: imageData.data.text11,
      data12: imageData.data.text12,
      data13: imageData.data.text13,
      data14: imageData.data.text14,
      data15: imageData.data.text15,
      data16: imageData.data.text16,
    },
  }))
}

export async function getImage(imageId: string) {

  if (!imageId) return
  const imageData = await prisma.image.findUnique({
    where: {
      id: imageId
    }
  })

  if (!imageData) return

  return combineImage({
    prefix: imageData.prefix,
    data: {
      text1: imageData.data1,
      text2: imageData.data2,
      text3: imageData.data3,
      text4: imageData.data4,
      text5: imageData.data5,
      text6: imageData.data6,
      text7: imageData.data7,
      text8: imageData.data8,
      text9: imageData.data9,
      text10: imageData.data10,
      text11: imageData.data11,
      text12: imageData.data12,
      text13: imageData.data13,
      text14: imageData.data14,
      text15: imageData.data15,
      text16: imageData.data16,
    }
  });
}