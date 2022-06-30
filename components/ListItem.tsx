import { Box, Text, Paper, CloseButton, Group } from '@mantine/core';

export default function ListItem({ item, price, members }) {
  const handleDelete = (event) => {};

  return (
    <Paper shadow="xs" p="xs" withBorder>
      <Group position="apart">
        <Box>{item}</Box>
        <Box>${price}</Box>
        <Box>{members.join(', ')}</Box>
        <CloseButton onClick={handleDelete} />
      </Group>
    </Paper>
  );
}
