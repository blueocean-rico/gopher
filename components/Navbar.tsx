import type { NextPage } from "next";
import Link from "next/link";
import { Grid, Menu, Button, Divider } from "@mantine/core";
import { NextLink } from "@mantine/next";

const Navbar: NextPage = () => {
  return (
    <>
      <Grid style={{ backgroundColor: "lightBlue", height: '4em', margin: 0 }} justify="center" align="center">
        <Grid.Col span={3}>
          <Link href="/">
            <Button variant="default">Gopher</Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={3} offset={6} style={{ textAlign: "right" }}>
          <Menu control={<Button variant="default">Options</Button>}>
            <Menu.Item component={NextLink} href="/">
              Home
            </Menu.Item>
            <Menu.Item component={NextLink} href="/households">
              House Holds
            </Menu.Item>
            <Menu.Item component={NextLink} href="/shoppinglist">
              List
            </Menu.Item>
          </Menu>
        </Grid.Col>
      </Grid>
      <Divider />
    </>
  );
};

export default Navbar;
