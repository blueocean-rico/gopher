import type { NextPage } from "next";
import Link from "next/link";
import { Grid, Menu, Button, Divider, Anchor, Title, Burger, Group } from "@mantine/core";
import { User, Bell } from "tabler-icons-react";
import { NextLink } from "@mantine/next";
import { useState } from 'react';

const Navbar: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';
  return (
    <>
      <Group
        style={{ backgroundColor: "#219EBC", color: 'white', height: "4em", margin: 0 }}
        position="apart"
      >
        <Link href="/">
          <Title order={1}>Gopher</Title>
        </Link>
        <Group>
          <Anchor component={NextLink} href="/profile">
            <User style={{color: 'white'}}/>
          </Anchor>
          <Anchor component={NextLink} href="/">
            <Bell style={{color: 'white'}} />
          </Anchor>
          <Menu control={
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={title}
            color='white'
            />}
          >
            {/* We can add more into this as needed */}
            <Menu.Item component={NextLink} href="/">
              Home
            </Menu.Item>
            <Menu.Item component={NextLink} href="/households">
              House Holds
            </Menu.Item>
            <Menu.Item component={NextLink} href="/lists">
              List
            </Menu.Item>
            <Menu.Item component={NextLink} href='/api/auth/logout'>
              Sign out
            </Menu.Item>
            <Menu.Item component={NextLink} href='/calendar/test?name=test'>
              Calendar
            </Menu.Item>
          </Menu>
        </Group>
      </Group>
      <Divider />
    </>
  );
};

export { Navbar };
