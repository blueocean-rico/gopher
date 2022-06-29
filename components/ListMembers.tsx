import { Box, Paper, Stack, Title } from '@mantine/core';

export default function BurrowMembers({ members }) {
  return (
    <Paper>
      <Title order={2}>Members</Title>
      <Stack>
        {members.map((member) => (
          <Box key={member}>{member}</Box>
        ))}
      </Stack>
    </Paper>
  );
}
