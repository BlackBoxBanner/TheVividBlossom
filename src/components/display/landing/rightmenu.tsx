import styles from "@/styles/pages/landing.module.scss";
import {
  AiFillHeart,
  AiFillMessage,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSearch,
  AiOutlineShopping, AiTwotoneShopping
} from "react-icons/ai";
import {Button} from "@/components/button";
import IconHover from "@/components/button/iconwithhover";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Outfit} from "next/font/google";
import {useSession} from "next-auth/react"
import btnStyles from "@/styles/components/button/iconbtn.module.scss"
import {useRouter} from "next/router";
import {Profile} from "@/components/button/profile";
import axios from "axios";


const outfit = Outfit({weight: "400", style: "normal", subsets: ["latin"]})

interface RightMenuProps {
  onProfile: Dispatch<SetStateAction<boolean>>
  setOverMenu: Dispatch<SetStateAction<boolean>>
}

export default function RightMenu(props: RightMenuProps) {
  const {data: session, status} = useSession()
  const [image, setImage] = useState<string>()

  useEffect(() => {
    async function fetchData() {
      const imageRes = await axios<{ image: string | undefined | null }>({
        method: "GET",
        baseURL: "/api/user/image",
        params: {
          email: session?.user?.email
        }
      })
      return imageRes.data
    }

    if (!image && session?.user?.email) {
      fetchData().then((e) => {
        if (!e.image) return
        setImage(e.image)
      })
    }

    return
  }, [image, session?.user?.email])

  const HasAuth = () => {
    return (
      <>
        <div>
          <div onClick={() => {
            props.onProfile(true)
            props.setOverMenu(true)
          }}>
            <Profile email={session?.user?.email!} image={image}/>
          </div>
        </div>
        <div>
          <IconHover
            outlineIcon={<AiOutlineMessage/>}
            fillIcon={<AiFillMessage/>}
            size={25}
            primaryTextColor={styles.primaryTextColor}
          />
        </div>
        <div>
          <IconHover
            outlineIcon={<AiOutlineHeart/>}
            fillIcon={<AiFillHeart/>}
            size={25}
            primaryTextColor={styles.primaryTextColor}
          />
        </div>
        <div>
          <IconHover
            outlineIcon={<AiOutlineShopping/>}
            fillIcon={<AiTwotoneShopping/>}
            size={25}
            primaryTextColor={styles.primaryTextColor}
          />
        </div>

      </>
    )
  }

  const NoAuth = () => {
    const router = useRouter()

    return (
      <div><Button onClick={() => router.push("/auth/login")}>log in</Button></div>
    )
  }

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState(false)
  return (
    <div className={`${styles.sidebar} ${styles.rightsidebar}`}>
      <div>
        <div
          className={`${styles.searchMenu} ${search || !!searchInputRef.current?.value ? styles.searchActive : ''}`}>
          <div className={`${outfit.className} ${styles.inputContainer}`}>
            <input
              ref={searchInputRef}
              style={{width: search || !!searchInputRef.current?.value ? "100%" : "0",}}
              type={"search"}
              placeholder={`What are you looking for ? `}
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
      {session ? <HasAuth/> : <NoAuth/>}
    </div>
  )
}