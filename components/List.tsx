import { Paper, Stack } from '@mantine/core';
import { ListItem } from '@/components/index';

export function List({ items, listId, users, members }) {
  return (
    <Paper
      sx={(theme) => ({
        //width: 500,
      })}
    >
      <Stack>
        {items.map((item) => (
          <ListItem key={item.id} item={item} editable={true} small={false} users={users} members={members}/>
        ))}
      </Stack>
    </Paper>
  );
}
