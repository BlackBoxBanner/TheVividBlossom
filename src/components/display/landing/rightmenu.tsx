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
import IconHover from "@/styles/components/button/iconwithhover";
import {useRef, useState} from "react";
import {Outfit} from "next/font/google";
import {useSession} from "next-auth/react"


const outfit = Outfit({weight: "400", style: "normal", subsets: ["latin"]})

export default function RightMenu() {
  const {data: session, status} = useSession()

  const HasAuth = () => {
    return (
      <>
        <div>
          <IconHover
            outlineIcon={<AiOutlineMessage />}
            fillIcon={<AiFillMessage />}
            size={25}
            primaryTextColor={styles.primaryTextColor}
          />
        </div>
        <div>
          <IconHover
            outlineIcon={<AiOutlineHeart />}
            fillIcon={<AiFillHeart />}
            size={25}
            primaryTextColor={styles.primaryTextColor}
          />
        </div>
        <div>
          <IconHover
            outlineIcon={<AiOutlineShopping />}
            fillIcon={<AiTwotoneShopping />}
            size={25}
            primaryTextColor={styles.primaryTextColor}
          />
        </div>
      </>
    )
  }

  const NoAuth = () => {
    return (
      <div><Button>log in</Button></div>
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
            <AiOutlineSearch size={"25"} />
          </div>
        </div>
      </div>
      {session ? <HasAuth /> : <NoAuth />}
    </div>
  )
}