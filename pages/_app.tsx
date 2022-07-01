import { AppProps } from 'next/app';
import Head from 'next/head';
import {UserProvider} from '@auth0/nextjs-auth0';
import { MantineProvider } from '@mantine/core';
import { Navbar, Footer } from '@/components/index';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
    <UserProvider>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
      <div style={{
        position: "relative",
        minHeight: "100vh"
      }}>
        <div style={{paddingBottom: "280px"}}>
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      </MantineProvider>
      </UserProvider>
    </>
  );
}
