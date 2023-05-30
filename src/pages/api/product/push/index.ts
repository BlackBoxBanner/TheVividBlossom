import {NextApiRequest, NextApiResponse} from "next";
import {loadRequireHook} from "next/dist/build/webpack/require-hook";
import {breakImage} from "@/hook/image";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    // id: string
  };
  body: {
    title: string
    description: string
    bloom_size: string
    Flower_Color: string
    Flower_Type: string
    Seasonal_Information: string
    showing_instruction: string
    Flower_Family: string
    selling_price: string
    sku: string
    inventory: string
    image: string
  };
}

export default async function getAllProductHandler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (
    req.headers.authorization != `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
  ) {
    return res.status(401).send("un-authorization")
  }

  const {method, body, query} = req;

  switch (method) {
    case "POST":
      try {
        const image = breakImage(body.image)

        // TODO - method goes here

        const product = await prisma?.product.create({
          data: {
            title: body.title!,
            description: body.description!,
            bloom_size: body.bloom_size!,
            Flower_Color: body.Flower_Color!,
            Flower_Type: body.Flower_Type!,
            Seasonal_Information: body.Seasonal_Information!,
            showing_instruction: body.showing_instruction!,
            Flower_Family: body.Flower_Family!,
            cost_price: parseInt(body.selling_price!) - 3,
            selling_price: parseInt(body.selling_price!),
            sku: body.sku!,
            inventory: parseInt(body.inventory!),
            category: "flower",
            create_at: new Date(),
            Product_Image: {
              create: {
                prefix: image.prefix!,
                data1: image.data.text1!,
                data2: image.data.text2!,
                data3: image.data.text3!,
                data4: image.data.text4!,
                data5: image.data.text5!,
                data6: image.data.text6!,
                data7: image.data.text7!,
                data8: image.data.text8!,
                data9: image.data.text9!,
                data10: image.data.text10!,
                data11: image.data.text11!,
                data12: image.data.text12!,
                data13: image.data.text13!,
                data14: image.data.text14!,
                data15: image.data.text15!,
                data16: image.data.text16!,
              }
            }
          }
        })

        return res.status(200).json(product)
      } catch
        (e) {
        res.status(400).send(e)
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}