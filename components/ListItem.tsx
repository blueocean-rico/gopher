import { Box, Text, Paper, CloseButton, Group, Button } from '@mantine/core';
import { Pencil } from 'tabler-icons-react';

export default function ListItem({ item, editable, small }) {
  const handleDelete = (event) => {};
  const handleEdit = (event) => {}

  if(editable) {
    return (
      <Paper shadow="xs" p="xs" withBorder>
        <Group position="apart">
          <Box>{item.name}</Box>
          <Box>${item.price}</Box>
          <Box>{item.members.join(', ')}</Box>
          <Button variant="subtle" color="dark" onClick={handleDelete}>X</Button>
          <Button variant="subtle" color="dark" onClick={handleEdit}><Pencil /></Button>
        </Group>
      </Paper>
    );
  }
}
