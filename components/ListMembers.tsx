import { Box, Paper, Stack, Title } from "@mantine/core";
// import gopherIcon from "@/public/gopherIcon"

export default function ListMembers({ listId: number, users. gopher }) {
  return (
    <Paper>
      <Title order={2}>Members</Title>
      <Stack>
        {users.map((user) => (
          // <Image
          //   src={gopherIcon}
          //   width={10}
          //   height={10}
          //   alt="google profile image"
          //   withPlaceholder
          // />
          <User key={user.id} user={user} />
          <Button variant="default">x</Button>
        ))}
        <Button variant="default">Add User</Button>
        <Button variant="default">Randomize Gopher</Button>
        <Button variant="default">Claim Gopher</Button>
      </Stack>
    </Paper>
  );
}
