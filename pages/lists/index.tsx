import type { NextPage } from 'next';
import { Title, Stack, Group } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import type { List, User, ListItemEvent } from '@/types/index';
import { NewListForm, Notifications } from '@/components/index';
import { getLists, getListItemEvents } from '@/server/lists/index';
import { getUsers } from '@/server/users/index';
import ListCard from '@/components/ListCard';
import { Group, Box, Button, Modal } from '@mantine/core';
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
<<<<<<< HEAD
    <>
      <Box style={{margin: 25}}>
        <Group>
          {lists.map((list) => (
            // <ListCard { list.name, list.createdAt, users}/>
            <ListCard list={list} users={users} />
          ))}
        </Group>
      </Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create a new list"
      >
        <NewListForm users={users}/>
      </Modal>
      <Button onClick={() => setOpened(true)} style={{margin: 25}}>
        create new list
      </Button>
    </>
=======
    <Stack>
      <Title order={1}>Your Lists</Title>
      <Group>
        <NewListForm users={users} />
        <Stack>
          <Title order={2}>Notifications</Title>
          <Notifications events={events} lists={lists} />
        </Stack>
      </Group>
    </Stack>
>>>>>>> 8867cad38fe817c76afd678f82676368741fd2cb
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
