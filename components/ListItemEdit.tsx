import {
  ActionIcon,
  Group,
  Paper,
  MultiSelect,
  TextInput,
} from '@mantine/core';
import { ReactNode, useState } from 'react';
import { Check, Plus } from 'tabler-icons-react';

export function ListItemEdit({ members, item = undefined, listId, setOpened }) {
  const [price, setPrice] = useState(item ? item.price : '');
  const [name, setName] = useState(item ? item.name : '');
  const [assignedMembers, setAssignedMembers] = useState(item ? item.users.map(user => user.nickname) : []);

  const names = members.map((user: { nickname: string }) => user.nickname);

  const handleAdd = (newItem) => {
    const userList = [];
    members.forEach((member) => {
      if (assignedMembers.indexOf(member.nickname) !== -1) {
        userList.push(member);
      }
    });
    if (newItem) {
      fetch(`/api/lists/${listId}/items`, {
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
      fetch(`/api/lists/1/items`, {
        method: 'PUT',
        body: JSON.stringify({
          start: item,
          end: { ...item, name, price, users: members.filter(member => assignedMembers.includes(member.nickname))},
          listId,
          eventType: 'modify',
          createdBy: { id: 1 },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      setOpened(false);
    }
    setName('');
    setPrice('');
    setAssignedMembers([]);
  };

  let confirm: ReactNode;
  if (item) {
    confirm = <Check size={16} onClick={() => handleAdd(false)} />;
  } else {
    confirm = <Plus onClick={() => handleAdd(true)} />;
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
          value={assignedMembers}
          onChange={setAssignedMembers}
          placeholder="users"
        />
        <ActionIcon variant="filled">{confirm}</ActionIcon>
      </Group>
    </Paper>
  );
}
