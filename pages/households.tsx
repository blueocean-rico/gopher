import type { NextPage } from "next";
import { List, Card, Title } from "@mantine/core";

const Households: NextPage = () => {
  return (
    <div>
      <div>Nav bar</div>
      <Title order={1}>Your households</Title>
      <List size="lg">
        <List.Item>House A</List.Item>
        <List.Item>House B</List.Item>
      </List>
    </div>
  );
};

export default Households;
