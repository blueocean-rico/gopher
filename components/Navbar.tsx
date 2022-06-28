import type { NextPage } from "next";
import Link from "next/link";
import { Grid, Menu, Button, Divider, Anchor } from "@mantine/core";
import { User, Bell } from "tabler-icons-react";
import { NextLink } from "@mantine/next";

const Navbar: NextPage = () => {
  return (
    <>
      <Grid
        style={{ backgroundColor: "lightBlue", height: "4em", margin: 0 }}
        align="center"
      >
        <Grid.Col span={3}>
          <Link href="/">
            <Button variant="default">Gopher</Button>
          </Link>
        </Grid.Col>
        <Grid.Col
          span={1}
          offset={6}
          style={{ textAlign: "center", marginTop: "0.4em" }}
        >
          <Anchor component={NextLink} href="/profile">
            <User />
          </Anchor>
          <Anchor component={NextLink} href="/">
            <Bell />
          </Anchor>
        </Grid.Col>
        <Grid.Col span={2} offset={0} style={{ textAlign: "center" }}>
          <Menu control={<Button variant="default">Options</Button>}>
            {/* We can add more into this as needed */}
            <Menu.Item component={NextLink} href="/">
              Home
            </Menu.Item>
            <Menu.Item component={NextLink} href="/households">
              House Holds
            </Menu.Item>
            <Menu.Item component={NextLink} href="/shoppinglist">
              List
            </Menu.Item>
            <Menu.Item component={NextLink} href='/api/auth/logout'>
              Sign out
            </Menu.Item>
          </Menu>
        </Grid.Col>
      </Grid>
      <Divider />
    </>
  );
};

export default Navbar;
