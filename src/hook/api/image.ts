import {breakImage, combineImage} from "@/hook/image";
import prisma from "@/lib/prisma";

interface updateImageProps {
  email: string
  image?: string | null,
}

export async function updateImage(props: updateImageProps) {

  if (!props.email) return
  if (!props.image) {
    return (
      await prisma.user.update({
        where: {
          email: props.email
        },
        data: {
          User_Image: {
            upsert: {
              update: {
                prefix: "",
                data1: "",
                data2: "",
                data3: "",
                data4: "",
                data5: "",
                data6: "",
                data7: "",
                data8: "",
                data9: "",
                data10: "",
                data11: "",
                data12: "",
                data13: "",
                data14: "",
                data15: "",
                data16: "",
              },
              create: {
                prefix: "",
                data1: "",
                data2: "",
                data3: "",
                data4: "",
                data5: "",
                data6: "",
                data7: "",
                data8: "",
                data9: "",
                data10: "",
                data11: "",
                data12: "",
                data13: "",
                data14: "",
                data15: "",
                data16: "",
              }
            }
          }
        }
      })
    )
  }
  console.log("updating image")

  const imageData = breakImage(props.image)
  // props.user.image
  return (
    await prisma.user.update({
      where: {
        email: props.email
      },
      data: {
        User_Image: {
          update: {
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
          }
        }
      }
    })
  )
}

export async function getImage(email: string) {

  if (!email) return
  const imageData = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      User_Image: true
    }
  })

  if (!imageData?.User_Image) return

  return combineImage({
    prefix: imageData.User_Image.prefix,
    data: {
      text1: imageData.User_Image.data1,
      text2: imageData.User_Image.data2,
      text3: imageData.User_Image.data3,
      text4: imageData.User_Image.data4,
      text5: imageData.User_Image.data5,
      text6: imageData.User_Image.data6,
      text7: imageData.User_Image.data7,
      text8: imageData.User_Image.data8,
      text9: imageData.User_Image.data9,
      text10: imageData.User_Image.data10,
      text11: imageData.User_Image.data11,
      text12: imageData.User_Image.data12,
      text13: imageData.User_Image.data13,
      text14: imageData.User_Image.data14,
      text15: imageData.User_Image.data15,
      text16: imageData.User_Image.data16,
    }
  });
}