import { Paper, SimpleGrid, Box } from "@mantine/core";
import { Avatar } from "@/components/index";

export function User({ user }) {
  return (
    <Paper shadow="xs" p="xs" withBorder>
      <SimpleGrid cols={2} spacing="xs">
        <Avatar user={user} size="md" />
        <Box>{user.nickname}</Box>
      </SimpleGrid>
    </Paper>
  );
}
