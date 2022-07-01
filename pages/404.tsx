import { Center, Title, Button, Space } from "@mantine/core";
import { NextLink } from "@mantine/next";

export default function Custom404() {
  return (
    <>
      <Center>
        <Title order={1}>404 - Page Not Found, Sorry!</Title>
      </Center>
      <Space h='xl'/>
      <Center>
        <Button component={NextLink} href="/">
          Go to home page
        </Button>
      </Center>
    </>
  );
}
