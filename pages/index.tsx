import {useUser} from '@auth0/nextjs-auth0';
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import { Title, Button, Grid, Text } from "@mantine/core";

const Home = () => {
  const {user, error, isLoading} = useUser();
  if (isLoading) {
    return (
      <div>
        ...loading
      </div>
    )
  };
  if (error) {
    return (
      <div>
        {error.message}
      </div>
    )
  }
  if (!user) {
    return (
      <Grid  style={{ height: "100%"}}>
        <Grid.Col span={4}  >
          <Title>Welcome To Gopher!</Title>
          <Link href='/api/auth/login' passHref>
            <Button>Sign in</Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={8} style={{ backgroundColor: "#FFB703", zIndex: "-100"}}>
          <Title order={5}>What are we about?</Title>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          <Title order={5}>Here is what our users have to say.</Title>
          <Text>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </Text>
          <Title order={5}>More from the critics.</Title>
          <Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. </Text>
        </Grid.Col>
      </Grid>
    )
  }
  return (
    <Grid>
      <Grid.Col span={4}>
        <Title>Welcome {user?.given_name}!</Title>
        <Title order={5}>New to Gopher?</Title>
        <Button>Start Here</Button>
      </Grid.Col>
      <Grid.Col span={4}>
        <Image src={user?.picture} width={50}
          height={50} alt='picture'/>
        <Link href='/api/auth/logout'>
          <a >Logout</a>
        </Link>
      </Grid.Col>
    </Grid>
  )
};
export default Home;