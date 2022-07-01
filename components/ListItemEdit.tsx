import {
  ActionIcon,
  Group,
  Paper,
  MultiSelect,
  TextInput,
} from '@mantine/core';
import { ReactNode, useState } from 'react';
import { Check, Plus } from 'tabler-icons-react';

export function ListItemEdit({ users, item = undefined, listId = 1 }) {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  const names = users.map((user: { nickname: string }) => user.nickname);

  const handleAdd = (newItem) => {
    const userList = [];
    users.forEach((user) => {
      if (assignedUsers.indexOf(user.nickname) !== -1) {
        userList.push(user);
      }
    });
    if (newItem) {
      fetch('/api/lists/1/items', {
        method: 'POST',
        body: JSON.stringify({
          end: { id: 1, listId, name, price: +price, users: userList },
          listId,
          start: null,
          eventType: 'add',
          createdBy: { id: 1 },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } else {
      fetch('/api/lists/1/items', {
        method: 'PUT',
        body: JSON.stringify({
          start: {
            id: item.id,
            name: 'temp',
            price: 123,
            users: ['temp'],
            listId: 1,
          },
          end: { id: 1, listId, name, price, users: userList },
          listId,
          eventType: 'modify',
          createdBy: { id: 1 },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  };

  let confirm: ReactNode;
  if (item) {
    confirm = <Plus size={16} onClick={() => handleAdd(false)} />;
  } else {
    confirm = <Check onClick={() => handleAdd(true)} />;
  }

  return (
    <Paper shadow="xs" p="xs" withBorder>
      <Group position="apart">
        <TextInput
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <MultiSelect
          data={names}
          value={assignedUsers}
          onChange={setAssignedUsers}
          placeholder="users"
        />
        <ActionIcon variant="filled">{confirm}</ActionIcon>
      </Group>
    </Paper>
  );
}
