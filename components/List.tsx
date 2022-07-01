import { Paper, Card, Stack } from '@mantine/core';
import ListItem from '@/components/ListItem';
import ListItemEdit from '@/components/ListItemEdit';

export default function List({ items, members }) {
  items=[];
  return (
    <Paper
      sx={(theme) => ({
        width: 500,
      })}
    >
      <Stack>
        <ListItemEdit members={members} mode={'add'}/>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item.name}
            price={item.price}
            members={item.members}
          />
        ))}
      </Stack>
    </Paper>
  );
}
