import {
  ActionIcon,
  Group,
  Paper,
  MultiSelect,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { Plus } from 'tabler-icons-react';

export default function ListItemEdit({ users, item, listId }) {
  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const names = users.map((user) => user.nickname)
  const handleAdd = (event) => {};

  return (
    <Paper shadow="xs" p="xs" withBorder>
      <Group position="apart">
        <TextInput placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
        <TextInput placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)}/>
        <MultiSelect data={names} placeholder='users'/>
        <ActionIcon variant="filled">
          <Plus size={16} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
