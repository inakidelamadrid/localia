import { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apollo';
import { AuthProvider } from 'src/auth/useAuth';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>Compra bueno, compra local</title>
          <link rel="ico" href="/favicon.ico" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Biryani:wght@200;400;600&family=Lora:ital,wght@0,400;1,700&family=Montserrat:wght@400;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
