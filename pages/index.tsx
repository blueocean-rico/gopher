import {useUser} from '@auth0/nextjs-auth0';
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import { Title, Button, Grid, Text } from "@mantine/core";

const Home: NextPage = () => {
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
          <Title order={5}>Why Millions of people choose Gopher</Title>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          <Title order={5}>Here is what our users have to say</Title>
          <Text>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </Text>
          <Title order={5}>More from the critics</Title>
          <Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. </Text>
        </Grid.Col>
      </Grid>
    )
  }
  return (
    <div>
      <Title>Welcome {user?.given_name}!</Title>
      <Grid>
        <Grid.Col span={3}>
          <Title order={3}>Your Households</Title>
          <Text>Houshold A</Text>
          <Text>Houshold B</Text>
          <Text>Houshold C</Text>
          <Link href='/households' passHref>
            <Button>See your households</Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={3}>
          <Title order={3}>Lists</Title>
          <Text>List 1</Text>
          <Text>List 2</Text>
          <Text>List 3</Text>
          <Link href='/lists' passHref>
            <Button>See your lists</Button>
          </Link>
          <Link href='/newListForm' passHref>
            <Button>create new list</Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={3}>Whats new</Title>
          <Text>Notification 1</Text>
          <Text>Notification 2</Text>
          <Text>Notification 3</Text>
          <Link href='/notifications' passHref>
            <Button>See all Notifications</Button>
          </Link>
        </Grid.Col>
      </Grid>
    </div>
  )
};

export default Home;
