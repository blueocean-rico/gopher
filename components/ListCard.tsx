import {Card, Group, Title, Text, Badge, Button, TextInput, Modal, Box} from '@mantine/core';
import { Pencil, X } from "tabler-icons-react";
import { useState } from 'react';
import { getListMembers } from '@/server/lists/listmembers.dal';
import {NewListForm} from '@/components/index';
import Link from 'next/link'

export default function ListCard({ list, users }) {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [gopher, setGopher] = useState('');
  const [members, setMembers] = useState([]);

  //getlistmembers from server/lists/listmembers.dal.ts
  // const getMembers = async () => {
  //   const result = await getListMembers(list.id);
  //   return result
  // }
  // const listMembers = getMembers();
  // console.log(listMembers)

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
    <div style={{ width: 350, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Title>
          {list.name}
        </Title>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          {list.createdAt.split(' ')[0]}
        </Text>

        <Text style={{ lineHeight: 1.5 }}>
          members: {users.map(user => (
            `${user.nickname}, `
          ))}
        </Text>

        <Badge color="pink" variant="light">
          gopher: {users.gopher}
        </Badge>

        <Group position="apart">
          <Box>
            <Link href={`lists/${list.id}`} passHref>
              <Button color="blue" style={{margin:5}}>
                view list
              </Button>
            </Link>
          </Box>
          <Box>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title={`edit ${list.name}`}
            >
              <NewListForm users={users}/>
            </Modal>
            <Button onClick={() => setOpened(true)} style={{margin:5}}>
              <Pencil />
            </Button>
            <Button onClick={() => handleDelete()} style={{margin:5}}>
              <X />
            </Button>
          </Box>
        </Group>
      </Card>
    </div>
  );
}
