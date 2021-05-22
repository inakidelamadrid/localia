import {AppProps} from 'next/app';
import Head from 'next/head';

import {ApolloProvider} from '@apollo/client';
import {useApollo} from 'src/apollo';
import {AuthProvider} from 'src/auth/useAuth';

import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  const client = useApollo();
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>Compra bueno, compra local</title>
          <link rel="ico" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
