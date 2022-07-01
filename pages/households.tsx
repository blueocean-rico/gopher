import type { NextPage } from "next";
import Navbar from "@/components/Navbar";
import { List, Card, Title } from "@mantine/core";
import ListItem from "@/components/ListItem";

const Households: NextPage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <ListItem item={{name: 'test', price: 30, members: ['me']}} editable={true} small={false}/>
      <Title order={1}>Your households</Title>
      <List size="lg">
        <List.Item>House A</List.Item>
        <List.Item>House B</List.Item>
      </List>
    </div>
  );
};

export default Households;
