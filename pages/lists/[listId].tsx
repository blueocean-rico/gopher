import type { NextPage } from 'next';
import { Group, Paper, Title } from '@mantine/core';
import ListMembers from '@/components/ListMembers';
import List from '@/components/List';

export default function ListPage({ tasks, members }): NextPage {
  members = ['me', 'you'];
  tasks = Array(10).fill({
    id: 1,
    name: 'broccoli',
    price: 100,
    quantity: 1,
    units: 'kg',
    members: ['me', 'you'],
  });

  return (
    <Paper>
      <Title order={1}>Your Items</Title>
      <Group align="flex-start">
        <List tasks={tasks} members={members} />
        <ListMembers members={members} />
      </Group>
    </Paper>
  );
}