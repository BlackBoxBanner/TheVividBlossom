import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useEffect, useState} from "react";
import {getImage} from "@/hook/getImage";
import Image from "next/image"
import axios from "axios";

const schema = z.object({
  email: z.string().min(1, "Required"),
  image: z.any().optional()
})

type DataProps = z.infer<typeof schema>

export default function Images() {
  const {watch, handleSubmit, register, formState: {errors}} = useForm<DataProps>({resolver: zodResolver(schema)})

  const [image, setImage] = useState<string>()

  useEffect(() => {
    const subscription = watch(async (value) => {
      if (value.image[0]) {
        getImage(value.image[0]).then((e) => {
          setImage(e!)
        })
      }
    });
    return () => subscription.unsubscribe();
  }, [watch])

  async function chanheData(data: DataProps) {
    const dataImage = await axios({
      baseURL: "/api/user/updateimage",
      method: "POST",
      data: {
        email: data.email,
        image
      }
    });
    return dataImage.statusText
  }


  function onSubmit(data: DataProps) {
    if (!data.email) return
    chanheData(data).then(r => console.log({r, data}))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" accept={"image/*"} {...register("image")} required={false}/>
        <input type="text" required {...register("email")}/>
        <button>click</button>
      </form>
      {String(errors)}
      <div style={{position: "relative", width: "50%", height: "40rem"}}>
        {image && <Image src={image} alt={""} fill style={{objectFit: "cover"}}/>}
      </div>
    </>
  )
}
