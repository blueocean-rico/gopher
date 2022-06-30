import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { List, User, ListItemEvent } from '@/types/index';
import { } from '@/components/index';
import { getLists, getListItemEvents } from '@/server/lists/index';
import { getUsers } from '@/server/users/index';
import ListCard from '@/components/ListCard';
import { Grid } from '@mantine/core';

interface Props {
  lists: List[];
  users: User[];
  events: ListItemEvent[];
}

const ListsPage: NextPage<Props> = ({ lists, users, events }) => {
  console.log('lists', lists, 'users', users, 'events', events);
  return (
    <>
      <Grid>
        {lists.map((list) => (
          // <ListCard { list.name, list.createdAt, users}/>
          <ListCard/>
        ))}
      </Grid>
    </>
  );
}

export default ListsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const lists = await getLists();
  const users = await getUsers();
  const listIds = lists.map(list => list.id);
  const events = await getListItemEvents(listIds);

  return { props: { lists, users, events } };
}
