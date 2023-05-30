import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {AdminContainer, ContentContainer} from "@/components/admin/container";
import AdminSideBar from "@/components/admin/sidebar";
import {Button, ButtonLogin} from "@/components/button";
import styles from "@/styles/admin/pages/product/index.module.scss";
import {outfit, outfitLabel} from "@/util/font";
import {useEffect, useRef, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import btnStyles from "@/styles/components/button/iconbtn.module.scss";
import axios from "axios";
import {Product} from ".prisma/client";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Input} from "@/components/input";
import {getImage} from "@/hook/getImage";

const schema = z.object({
  title: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
  bloom_size: z.string().min(1, "This field is required"),
  Flower_Color: z.string().min(1, "This field is required"),
  Flower_Type: z.string().min(1, "This field is required"),
  Seasonal_Information: z.string().min(1, "This field is required"),
  showing_instruction: z.string().min(1, "This field is required"),
  Flower_Family: z.string().min(1, "This field is required"),
  selling_price: z.string().min(1, "This field is required"),
  sku: z.string().min(1, "This field is required"),
  inventory: z.string().min(1, "This field is required"),
  image: z.any().optional()
})

type DataProps = z.infer<typeof schema>

function AdminDashboard() {

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState(false)

  const {register, handleSubmit, formState: {errors}, setError, watch} = useForm<DataProps>({
    resolver: zodResolver(schema),
  })

  const [image, setImage] = useState("")

  useEffect(() => {
    const subscription = watch(async (value) => {
      if (value.image[0] && typeof value.image == "object") {
        getImage(value.image[0]).then((e) => {
          setImage(e!)
        })
      } else {
        setImage(image)
      }
    });
    return () => subscription.unsubscribe();
  }, [image, watch])

  const onSubmit: SubmitHandler<DataProps> = async (data) => {
    console.log(data)
    await axios({
      url: "/api/product/push",
      method: "POST",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      data: {
        title: data.title,
        description: data.description,
        bloom_size: data.bloom_size,
        Flower_Color: data.Flower_Color,
        Flower_Type: data.Flower_Type,
        Seasonal_Information: data.Seasonal_Information,
        showing_instruction: data.showing_instruction,
        Flower_Family: data.Flower_Family,
        selling_price: data.selling_price,
        sku: data.sku,
        inventory: data.inventory,
        image,
      }
    }).then(() => {
      router.push(`/admin/products`)
    }).catch(e => {
      console.error(e)
    })
  }


  // Don't touch
  const router = useRouter()
  const {status, data: session, update} = useSession()

  function checkAuth() {
    if (status == "unauthenticated") {
      router.push("/").then()
      return true
    }
    if (session?.user?.email != undefined) {
      router.push("/").then()
      return true
    }
    return false
  }

  if (status == "loading") return <></>
  if (checkAuth()) return <></>
  return (
    <>
      <Head>
        <title>Admin - products</title>
        <meta
          name="description"
          content="CPE241 - Database System Project"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <AdminContainer>
        <AdminSideBar page={"product"}/>
        <ContentContainer>
          <header className={`${styles.header} ${outfitLabel.className}`}>
            <div className={`${styles.headerLeft}`}>
              <div className={`${styles.title}`}>
                <p>Products - Add</p>
              </div>
            </div>
            <div>
              <div
                className={`${styles.searchMenu} ${search || !!searchInputRef.current?.value ? styles.searchActive : ''}`}>
                <div className={`${outfit.className} ${styles.inputContainer}`}>
                  <input
                    ref={searchInputRef}
                    style={{width: search || !!searchInputRef.current?.value ? "100%" : "0",}}
                    type={"search"}
                    placeholder={`search`}
                    // onFocus={"if(this.value==this.defaultValue)this.value='';"}
                    // onBlur={"if(this.value=='')this.value=this.defaultValue;"}
                    onMouseOver={() => setSearch(true)}
                    onMouseLeave={() => setSearch(false)}
                  />
                </div>
                <div
                  onMouseOver={() => setSearch(true)}
                  onMouseLeave={() => setSearch(false)}
                >
                  <AiOutlineSearch size={"25"} className={btnStyles.icon}/>
                </div>
              </div>
            </div>
          </header>
          <section className={`${styles.contents}`}>
            <form id={"AddProduct"} onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
              <Input label={"Flower Name"} placeholder={""} {...register("title")}/>
              <Input label={"Description"} placeholder={""} {...register("description")}/>
              <Input label={"Color"} placeholder={""} {...register("Flower_Color")}/>
              <Input label={"Flower Type"} placeholder={""} {...register("Flower_Type")}/>
              <Input label={"Blooming Season"} placeholder={""} {...register("Seasonal_Information")}/>
              <Input label={"Highly Recommended"} placeholder={""}/>
              <Input label={"Flower Family"} placeholder={""} {...register("Flower_Family")}/>
              <Input label={"Bloom Size"} placeholder={""} {...register("bloom_size")}/>
              <Input label={"Growing Conditions"} placeholder={""} {...register("showing_instruction")}/>
              <Input label={"Price"} placeholder={""} {...register("selling_price")}/>
              <Input label={"SKU"} placeholder={""} {...register("sku")}/>
              <Input label={"Inventory"} placeholder={""} {...register("inventory")}/>
              <div className={`${styles.inputContainerInput}`}>
                <label htmlFor="flowerImage" className={`${styles.label} ${outfitLabel.className}`}>
                  Flower Image
                </label>
                <input type="file" accept={"image/*"} id={"flowerImage"}
                       className={`${outfit.className} ${styles.input}`}
                       {...register("image")}/>
              </div>
            </form>
            <div className={`${styles.btnContainer}`}>
              <ButtonLogin dark font={"Outfit"} style={{width: "10rem"}}
                           onClick={() => router.push("/admin/products")}>Cancel</ButtonLogin>
              <ButtonLogin font={"Outfit"} type={"submit"} style={{width: "10rem"}}
                           form={"AddProduct"}>Add</ButtonLogin>
            </div>
          </section>
        </ContentContainer>
      </AdminContainer>
    </>
  )
}

export default AdminDashboard