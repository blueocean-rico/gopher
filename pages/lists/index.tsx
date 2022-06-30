import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { List, User, ListItemEvent } from '@/types/index';
import NewListForm from '@/components/NewListForm';
import { getLists, getListItemEvents } from '@/server/lists/index';
import { getUsers } from '@/server/users/index';
import ListItemEdit from '@/components/ListItemEdit';

interface Props {
  lists: List[];
  users: User[];
  events: ListItemEvent[];
}

const ListsPage: NextPage<Props> = ({ lists, users, events }) => {
  console.log('lists', lists, 'users', users, 'events', events);
  return (
    <>
      <NewListForm />
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
