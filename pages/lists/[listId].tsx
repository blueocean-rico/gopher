import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { ListItem, User, ListItemEvent } from '@/types/index';
import {} from '@/components/index';
import {
  getListItems,
  getListMembers,
  getListItemEvents,
} from '@/server/lists/index';

interface Props {
  items: ListItem[];
  members: User[];
  events: ListItemEvent[];
}

const ListPage: NextPage<Props> = ({ items, members, events }) => {
  console.log('items', items, 'members', members, 'events', events);
  return <></>;
};

export default ListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listId = Number(context.query.listId);
  const items = await getListItems(listId);
  const members = await getListMembers(listId);
  const events = await getListItemEvents([listId]);

  return { props: { items, members, events } };
};
