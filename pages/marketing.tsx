import Head from 'next/head'

import { NextPage } from 'next'

const Marketing: NextPage = () => (
  <div className="flex">
    <Head>
      <link
        rel="preload"
        href="/fonts/Syne/Syne-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin
      />
      <link
        rel="preload"
        href="/fonts/Syne/Syne-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin
      />
    </Head>
    <h1 className="font-syne text-xl">Comprar local ayuda a tu comunidad</h1>
  </div>
)

export default Marketing
