import { Box, Text, Paper, Group, Button } from '@mantine/core';
import { Pencil } from 'tabler-icons-react';

export function ListItem({ item, editable, small }) {
  const handleDelete = () => {
    console.log(item);
    fetch('api/lists/0/items', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // TODO change them if there is dynamic available
        // The id of the item
        start: { id: item.id },
        // The id of the user that made it
        createdBy: { id: 6 },
        // The id of the list
        listId: 1,
      }),
    });
  };
  const handleEdit = (event) => {
    //TODO make work with the listItemEdit
  };

  if (small) {
    return (
      <Text>
        Avatar {item.name}, ${item.price}
      </Text>
    );
  } else if (editable) {
    return (
      <Paper shadow="xs" p="xs" withBorder>
        <Group position="apart">
          <Box>Render Avatar here once it is done</Box>
          <Box>{item.name}</Box>
          <Box>${item.price}</Box>
          <Box>{item.members.join(', ')}</Box>
          <Button variant="subtle" color="dark" onClick={handleDelete}>
            X
          </Button>
          <Button variant="subtle" color="dark" onClick={handleEdit}>
            <Pencil />
          </Button>
        </Group>
      </Paper>
    );
  }
}
