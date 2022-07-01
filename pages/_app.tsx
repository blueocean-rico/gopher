import { AppProps } from 'next/app';
import Head from 'next/head';
import {UserProvider} from '@auth0/nextjs-auth0';
import { MantineProvider, AppShell, Group } from '@mantine/core';
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
      <AppShell
      padding="md"
      header={<Navbar />}
      footer={<Footer />}
      styles={(theme) => ({
        main : {
          padding: '10px 20px',
        }
        // main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
      >
        <Group position="center">
        <Component {...pageProps} />
        </Group>
      </AppShell>
      {/* <div style={{
        position: "relative",
        minHeight: "100vh"
      }}>
        <div style={{paddingBottom: "280px"}}>
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div> */}
      </MantineProvider>
      </UserProvider>
    </>
  );
}
