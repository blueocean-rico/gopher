import { Button, Center, Title, Space } from "@mantine/core";
import { NextLink } from "@mantine/next";

export default function Custom500() {
  return (
    <>
    <Center>
      <Title order={1}>500 - Server-side error occurred, Sorry!</Title>
    </Center>
    <Space h='xl'/>
    <Center>
      <Button component={NextLink} href="/">Go to home page</Button>
    </Center>
    </>
  );
}
