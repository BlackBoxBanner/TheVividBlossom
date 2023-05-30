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
import {User} from ".prisma/client";
import {loadRequireHook} from "next/dist/build/webpack/require-hook";
import Link from "next/link";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import DataGrid from 'react-data-grid';

function AdminDashboard() {

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState(false)
  const [products, setProducts] = useState<User[]>([])
  const [total, setTotal] = useState(0)

  async function fetchHandler() {
    const productsRes = await axios<User[]>({
      url: "/api/user/admin",
      method: "GET",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
      },
    })
    setProducts(productsRes.data)


  }

  useEffect(() => {
    fetchHandler().then()
    // if (!total && products) {
    //   products.map((value) => {
    //     setTotal(prev => prev + value.selling_price)
    //   })
    // }
  }, [])

  interface ProductProps {
    sku: string
    title: string
    Flower_Color: string
    Flower_Type: string
    Seasonal_Information: string
    selling_price: string
    inventory: string
  }

  const columnHelper = createColumnHelper<User>()

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day} / ${month} / ${year}`;
  }

  const columns = [
    columnHelper.accessor('id', {
      header: "ID",
      cell: info => info.getValue(),
      footer:footer => `Count ${products.length}`
    }),
    columnHelper.accessor('first_name', {
      header: "FIRST NAME",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('last_name', {
      header: "LAST NAME",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('telephone', {
      header: "PHONE NUMBER",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('dob', {
      header: "BIRTHDATE",
      cell: info => formatDate(String(info.getValue())),
    }),
    columnHelper.accessor('email', {
      header: "EMAIL",
      cell: info => info.getValue(),
    })
  ]

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
        <AdminSideBar page={"customer"}/>
        <ContentContainer>
          <header className={`${styles.header} ${outfitLabel.className}`}>
            <div className={`${styles.headerLeft}`}>
              <div className={`${styles.title}`}>
                <p>Products</p>
              </div>
              <div>
                <ButtonLogin dark font={"Outfit"} onClick={() => router.push("#")}>Add
                  product</ButtonLogin>
                <ButtonLogin dark font={"Outfit"}>Sort by: Flower</ButtonLogin>
                <ButtonLogin dark font={"Outfit"}>Remove product</ButtonLogin>
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
            <table className={`${styles.table} ${outfitLabel.className}`}>
              <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
              </thead>
              <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
              <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
              </tfoot>
            </table>
            {/*{String(JSON.stringify(products))}*/}
          </section>
        </ContentContainer>
      </AdminContainer>
    </>
  )
}

export default AdminDashboard