import {useState, useEffect} from "react";
import Head from "next/head";
import {Cardo} from "next/font/google";

import styles from "@/styles/pages/landing.module.scss"

import {MenuButton} from "@/components/button/landing"
import OverText from "@/components/display/landing/overtext";
import OverMenu from "@/components/display/landing/overlaymenu";

import {Contact} from "@/components/display/landing/contact";
import ImageContainer from "@/components/display/landing/imageShow";
import InnerMenu, {ListItem} from "@/components/display/landing/innerMenu";
import RightMenu from "@/components/display/landing/rightmenu";
import {useSession} from "next-auth/react";
import {ProfileMenu} from "@/components/display/landing/profile";
import axios from "axios";
import {useRouter} from "next/router";

// const outfit = Outfit({weight: "400", style: "normal", subsets: ["latin"]})
const cardo = Cardo({weight: "400", subsets: ["greek"], style: "italic"})

export default function Home() {

  const colorList = [
    {set1: "#DC6A74", set2: "#D61C4E"},
    {set1: "#4E4B90", set2: "#50AB75"},
    {set1: "#AC001A", set2: "#FAC213"}
  ]
  const timePerLoop = 10000

  const [state, setState] = useState<number>(0);
  const [overMenu, setOverMenu] = useState(false)
  const [contact, setContact] = useState(false)
  // const [seed, setSeed] = useState(false)
  const [color, setColor] = useState(false)
  const [type, setType] = useState(false)
  const [season, setSeason] = useState(false)
  const [recommend, setRecommend] = useState(false)
  const [image, setImage] = useState(false)

  const [userId, setUserId] = useState<string>()

  const router = useRouter()

  useEffect(() => {
    function intervalCallback() {
      if (state < colorList.length - 1) {
        setState((prev) => prev + 1)
      } else {
        setState(0)
      }
    }

    const interval = setInterval(intervalCallback, timePerLoop)
    return () => clearInterval(interval)
  }, [colorList.length, state])

  const flowerColor = [
    {
      title: "Blue and Violet",
    },
    {
      title: "Yellow",
    },
    {
      title: "Red",
    },
    {
      title: "Pink",
    },
    {
      title: "White and Cream",
    },
    {
      title: "Mixed Color",
    }
  ] satisfies ListItem[]

  const flowerType = [
    {
      title: "Shrub Tree",
    },
    {
      title: "Upright Tree",
    },
    {
      title: "Climbing Tree",
    }
  ] satisfies ListItem[]

  const flowerSeason = [
    {
      title: "Summer",
    },
    {
      title: "Spring",
    },
    {
      title: "Autumn",
    },
    {
      title: "Winter",
    }
  ] satisfies ListItem[]

  const flowerRecommend = [
    {
      title: "Best for Decoration",
    },
    {
      title: "Best for Fragrance",
    },
    {
      title: "Best for Health",
    }
  ] satisfies ListItem[]

  const accountSettingList = [
    {
      title: "Edit Account",
      link: `/user/${userId || "no-id"}/account`
    },
    {
      title: "My Order",
    },
    {
      title: "My Wishlist",
    },
    {
      title: "My Basket",
    },
    {
      title: "Payment Method",
      link: `/user/${userId || "no-id"}/payment`
    },
    {
      title: "Shipping Address",
    },
    {
      title: "Login and Security",
    }
  ] satisfies ListItem[]

  const [accountSetting, setAccountSetting] = useState(false)

  const {data: session} = useSession()

  useEffect(() => {
    const email = session?.user?.email
    if (!email) return

    async function getUser() {
      return axios<{ id: string }>({
        baseURL: "/api/user/id",
        method: "GET",
        params: {
          email
        }
      });
    }

    getUser().then(e => {
      if (e.status == 200) {
        setUserId(e.data.id)
      }
    })

  }, [session?.user?.email])


  return (
    <>
      <Head>
        <title>The Vivid Blossom</title>
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
      <main style={{position: "relative"}}>
        <div className={styles.main + " " + cardo.className}>
          <div className={styles.sidebar + " " + styles.leftsidebar}>
            <MenuButton onClick={() => router.push("/product")}>All Flower Seeds</MenuButton>
            <MenuButton onClick={() => {
              setColor(true)
              setOverMenu(true)
            }}>Flower Color</MenuButton>
            <MenuButton onClick={() => {
              setType(true)
              setOverMenu(true)
            }}>Flower Type</MenuButton>
            <MenuButton onClick={() => {
              setSeason(true)
              setOverMenu(true)
            }}>Blooming Season</MenuButton>
            <MenuButton onClick={() => {
              setRecommend(true)
              setOverMenu(true)
            }}>Highly Recommended</MenuButton>
            <MenuButton
              onClick={() => {
                setContact(true)
                setOverMenu(true)
              }}
            >Contact</MenuButton>
          </div>
          <div className={styles.rightContent}>
            <ImageContainer stage={state}/>
            <RightMenu onProfile={setImage} setOverMenu={setOverMenu}/>
          </div>
          <OverText
            colors={colorList}
            content={{set1: "The Vivid", set2: "Blossom"}}
            timePerLoop={8000}
            state={state}
          />
        </div>
        <OverMenu
          onClose={() => {
            setOverMenu(false)
            setContact(false)
            setColor(false)
            setType(false)
            setSeason(false)
            setRecommend(false)
            setImage(false)
          }}
          style={overMenu ? {opacity: "0.9", zIndex: 3} : {opacity: "0", zIndex: -10}}
        >
          {/*{seed && <InnerMenu list={flowerSeed}/>}*/}
          {color && <InnerMenu list={flowerColor}/>}
          {type && <InnerMenu list={flowerType}/>}
          {season && <InnerMenu list={flowerSeason}/>}
          {recommend && <InnerMenu list={flowerRecommend}/>}
          {contact && <Contact/>}
          {image && <ProfileMenu setOverMenu={setOverMenu} setAccountSetting={setAccountSetting}/>}
        </OverMenu>
        <OverMenu
          invert style={accountSetting ? {opacity: "1", zIndex: 3} : {opacity: "0", zIndex: -10}}
          onClose={() => {
            setAccountSetting(false)
          }}>
          <InnerMenu list={accountSettingList}/>
        </OverMenu>
      </main>
    </>
  )
}