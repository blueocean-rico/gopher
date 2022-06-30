import { Paper, SimpleGrid } from "@mantine/core";
import Avatar from "@/components/Avatar";

export default function User({ user }) {
  return (
    <Paper shadow="xs" p="xs" withBorder>
      <SimpleGrid cols={2} spacing="xs">
        <Avatar user={user} size="md" />
        <div>{user.nickname}</div>
      </SimpleGrid>
    </Paper>
  );
}
