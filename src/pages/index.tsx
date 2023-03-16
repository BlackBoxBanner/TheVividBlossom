import Head from "next/head";
import style from "@/styles/main.module.css";
import {NavBar} from "@/components/navbar";
import Image from "next/image";

export default function Home({csrfToken}: { csrfToken: string }) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={style.main}>
                <NavBar/>
            </main>
        </>
    );
}



