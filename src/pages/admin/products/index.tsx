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
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)

  async function fetchHandler() {
    const productsRes = await axios<Product[]>({
      url: "/api/product/admin",
      method: "GET",
      headers: {
        Authorization: `Simple ${process.env.NEXT_PUBLIC_API_KEY}`
      },
    })
    setProducts(productsRes.data)


  }


  useEffect(() => {
    if (!total && products) {
      fetchHandler().then()
      products.map((value) => {
        setTotal(prev => prev + value.selling_price)
      })
    }
  }, [products, total])

  interface ProductProps {
    sku: string
    title: string
    Flower_Color: string
    Flower_Type: string
    Seasonal_Information: string
    selling_price: string
    inventory: string
  }

  const columnHelper = createColumnHelper<Product>()

  const columns = [
    columnHelper.accessor('sku', {
      header: "SKU",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('title', {
      header: "FLOWER NAME",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('Flower_Color', {
      header: "COLOR",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('Flower_Type', {
      header: "FLOWER TYPE",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('Seasonal_Information', {
      header: "BLOOMING SEASON",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('selling_price', {
      header: "PRICE",
      cell: info => info.getValue(),
      footer: `${String(total)}`
    }),
    columnHelper.accessor('inventory', {
      header: "INVENTORY",
      cell: info => info.getValue(),
    }),
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
        <AdminSideBar page={"product"}/>
        <ContentContainer>
          <header className={`${styles.header} ${outfitLabel.className}`}>
            <div className={`${styles.headerLeft}`}>
              <div className={`${styles.title}`}>
                <p>Products</p>
              </div>
              <div>
                <ButtonLogin dark font={"Outfit"} onClick={() => router.push("/admin/products/add")}>Add
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