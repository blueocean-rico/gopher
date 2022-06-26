import { Paper, List, Card, Stack } from '@mantine/core';
import ShoppingListItem from './ShoppingListItem.tsx';
import ShoppingListAdd from './ShoppingListAdd.tsx';

export default function ShoppingList({ tasks, members }) {
  return (
    <Paper
      sx={(theme) => ({
        width: 500,
      })}
    >
      <Stack>
        <ShoppingListAdd members={members} />
        {tasks.map((task) => (
          <ShoppingListItem
            key={task.id}
            item={task.name}
            price={task.price}
            members={task.members}
          />
        ))}
      </Stack>
    </Paper>
  );
}
