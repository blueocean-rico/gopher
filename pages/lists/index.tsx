import type { NextPage } from 'next';
import { Title, Stack, Group, Button, Modal, SimpleGrid } from '@mantine/core';
import type { List, User, ListItemEvent } from '@/types/index';
import { NewListForm, Notifications } from '@/components/index';
import ListCard from '@/components/ListCard';
import { useState } from 'react';
import useSWR from 'swr';

interface Props {
  lists: List[];
  users: User[];
  events: ListItemEvent[];
}

const ListsPage: NextPage<Props> = () => {
  const [opened, setOpened] = useState(false);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR('/api/lists', fetcher, {
    refreshInterval: 10,
  });
  if (!data) {
    return <div></div>;
  }
  const { lists, users, events } = data;
  console.log('HERE', data);
  console.log('lists', lists, 'users', users, 'events', events);
  return (
    <Group align="flex-start" spacing="xl">
      <Stack>
        <Group>
          <Title order={1}>Your Lists</Title>
          <Button onClick={() => setOpened(true)} style={{ margin: 25 }}>
            create new list
          </Button>
        </Group>
        <SimpleGrid cols={2}>
          {lists.map((list) => (
            // <ListCard { list.name, list.createdAt, users}/>
            <ListCard list={list} users={users} key={list.id} />
          ))}
        </SimpleGrid>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Create a new list"
        >
          <NewListForm users={users} />
        </Modal>
      </Stack>
      <Stack>
        <Title order={2} mt={30}>
          Notifications
        </Title>
        <Group align="baseline" spacing="lg"></Group>
        <Notifications events={events} lists={lists} />
      </Stack>
    </Group>
  );
};

export default ListsPage;
