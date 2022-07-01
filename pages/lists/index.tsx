import type { NextPage } from 'next';
import { Title, Stack, Group, Box, Button, Modal, SimpleGrid } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import type { List, User, ListItemEvent } from '@/types/index';
import { NewListForm, Notifications  } from '@/components/index';
import { getLists, getListItemEvents } from '@/server/lists/index';
import { getUsers } from '@/server/users/index';
import ListCard from '@/components/ListCard';
import { useState } from 'react';

interface Props {
  lists: List[];
  users: User[];
  events: ListItemEvent[];
}

const ListsPage: NextPage<Props> = ({ lists, users, events }) => {
  const [opened, setOpened] = useState(false);
  console.log('lists', lists, 'users', users, 'events', events);
  return (
    <Stack>
      <Group>
      <Title order={1}>Your Lists</Title>
      <Button onClick={() => setOpened(true)} style={{margin: 25}}>
        create new list
      </Button>
      </ Group>
      <Group>
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
        <NewListForm users={users}/>
      </Modal>
        <Stack>
          <Title order={2}>Notifications</Title>
          <Notifications events={events} lists={lists} />
        </Stack>
      </Group>
    </Stack>
  );
};

export default ListsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const lists = await getLists();
  const users = await getUsers();
  const listIds = lists.map((list) => list.id);
  const events = await getListItemEvents(listIds);

  return { props: { lists, users, events } };
};
