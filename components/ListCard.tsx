import {Card, Group, Title, Text, Badge, Button, TextInput, Modal} from '@mantine/core';
import { Pencil, X } from "tabler-icons-react";
import { useState } from 'react';

export default function ListCard({ list, users }) {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [members, setMembers] = useState([]);

  const handleSubmit = async () => {
    await fetch('/api/lists', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({list: { name , createdAt: list.createdAt, id: list.id}}),
    });
    setName('');
    setLocation('');
    setMembers([]);
  };

  const handleDelete = async () => {
    await fetch('/api/lists', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId: list.id }),
    });
    setName('');
    setLocation('');
    setMembers([]);
  };

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Title>
          {list.name}
        </Title>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          {list.createdAt}
        </Text>

        <Text style={{ lineHeight: 1.5 }}>
          members: {users.map(user => (
            `${user.nickname}, `
          ))}
        </Text>

        <Badge color="pink" variant="light">
          current gopher: {users[0].nickname}
        </Badge>

        <Group position="apart">
          <Button color="blue" >
            view list
          </Button>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Edit this list"
          >
            <form onSubmit={handleSubmit}>
            <TextInput
              label="Name"
              required
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
            <TextInput
              label="Location"
              required
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
            />
              <Button onClick={handleSubmit}>Submit</Button>
            </form>
          </Modal>
          <Button onClick={() => setOpened(true)}>
            <Pencil />
          </Button>
          <Button onClick={() => handleDelete()}>
            <X />
          </Button>
        </Group>
      </Card>
    </div>
  );
}