import {AppProps} from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Compra bueno, compra local</title>
        <link rel="ico" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
