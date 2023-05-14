import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react'
import Cursor from "@/util/cursor";

export default function App({
                              Component,
                              pageProps: {session, ...pageProps},
                            }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Cursor>
        <Component {...pageProps} />
      </Cursor>
    </SessionProvider>
  )
}
