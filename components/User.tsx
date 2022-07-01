import { Paper, Group, Box } from "@mantine/core";
import { Avatar } from "@/components/index";

export function User({ user }) {
  return (
    <Paper shadow="xs" withBorder style={{padding: 5}}>
      <Group spacing="xs">
        <Avatar user={user} size="sm" />
        <Box>{user.nickname}</Box>
      </Group>
    </Paper>
  );
}
