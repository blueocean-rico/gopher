import { useEffect } from 'react';
import {
  Card,
  Group,
  Title,
  Text,
  Badge,
  Button,
  TextInput,
  Modal,
  Box,
} from '@mantine/core';
import { Pencil, X } from 'tabler-icons-react';
import { useState } from 'react';
import { getListMembers } from '@/server/lists/listmembers.dal';
import { NewListForm } from '@/components/index';
import Link from 'next/link';

export default function ListCard({ list, users }) {
  const [opened, setOpened] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const fetchedMembers = await fetch(`/api/lists/${list.id}/members`).then(
        (r) => r.json()
      );
      setMembers(fetchedMembers);
    };

    fetchMembers();
  }, [list.id]);

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
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list: { name, createdAt: list.createdAt, id: list.id },
      }),
    });
    setName('');
    setLocation('');
    setMembers([]);
  };

  const handleDelete = async () => {
    await fetch('/api/lists', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId: list.id }),
    });
  };

  return (
    <div style={{ width: 400, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Title>{list.name}</Title>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          {list.createdAt.split(' ')[0]}
        </Text>

        <Text style={{ lineHeight: 1.5 }}>
          {members.map((member) => member.nickname).join(', ')}
        </Text>
        <Badge color="pink" variant="light">
          gopher:{' '}
          {members.some((member) => member.gopher) &&
            members.filter((member) => member.gopher).nickname}
        </Badge>

        <Group position="apart">
          <Box>
            <Link href={`lists/${list.id}`} passHref>
              <Button color="blue" style={{ margin: 5 }}>
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
              <NewListForm users={users} list={list} setOpened={setOpened}/>
            </Modal>
            <Button onClick={() => setOpened(true)} style={{ margin: 5 }}>
              <Pencil />
            </Button>
            <Button onClick={() => handleDelete()} style={{ margin: 5 }}>
              <X />
            </Button>
          </Box>
        </Group>
      </Card>
    </div>
  );
}
