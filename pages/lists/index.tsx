import type { NextPage } from 'next';
import { Title, Stack, Group } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import type { List, User, ListItemEvent } from '@/types/index';
import { NewListForm, Notifications } from '@/components/index';
import { getLists, getListItemEvents } from '@/server/lists/index';
import { getUsers } from '@/server/users/index';

interface Props {
  lists: List[];
  users: User[];
  events: ListItemEvent[];
}

const ListsPage: NextPage<Props> = ({ lists, users, events }) => {
  console.log('lists', lists, 'users', users, 'events', events);
  return (
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
