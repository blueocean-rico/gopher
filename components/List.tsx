import { Paper, Card, Stack } from '@mantine/core';
import ListItem from '@/components/ListItem';
import ListItemEdit from '@/components/ListItemEdit';

export default function List({ items, listId, users }) {
  return (
    <Paper
      sx={(theme) => ({
        width: 500,
      })}
    >
      <Stack>
        <ListItemEdit listId={listId} item={undefined} users={users} />
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            editable = {true}
            small = {false}
          />
        ))}
      </Stack>
    </Paper>
  );
}
