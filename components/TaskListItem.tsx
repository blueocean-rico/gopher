import { Box, Text, Paper, CloseButton, Group } from '@mantine/core';

export default function TaskListItem({ item, members }) {
  const handleDelete = (event) => {};

  return (
    <Paper shadow="xs" p="xs" withBorder>
      <Group position="apart">
        <Box>{item}</Box>
        <Box>{members.join(', ')}</Box>
        <CloseButton onClick={handleDelete} />
      </Group>
    </Paper>
  );
}
