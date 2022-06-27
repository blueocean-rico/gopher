import {
  ActionIcon,
  Group,
  Paper,
  MultiSelect,
  TextInput,
} from '@mantine/core';
import { Plus } from 'tabler-icons-react';

export default function ShoppingListAdd({ members }) {
  const handleAdd = (event) => {};

  return (
    <Paper shadow="xs" p="xs" withBorder>
      <Group position="apart">
        <TextInput />
        <MultiSelect data={members} />
        <ActionIcon variant="filled">
          <Plus size={16} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
