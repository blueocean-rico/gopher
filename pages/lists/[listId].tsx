import { Button, Title, Group, Stack } from '@mantine/core';
import { Clock } from 'tabler-icons-react';
import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { ListItem, Member, User, ListItemEvent } from '@/types/index';
import { List, ListItemEdit, ListMembers } from '@/components/index';
import { getUsers } from '@/server/users/index';
import {
  getListItems,
  getListMembers,
  getListItemEvents,
} from '@/server/lists/index';

interface Props {
  listId: number;
  items: ListItem[];
  members: Member[];
  events: ListItemEvent[];
  users: User[];
}

const ListPage: NextPage<Props> = ({
  listId,
  items,
  members,
  events,
  users,
}) => {
  console.log('items', items, 'members', members, 'events', events);
  return (
    <Group>
      <Stack>
        {/*TODO: set up fetching of actual list from db by listId (need to change lists.dal*/}
        <Title order={1}>List Name</Title> <Clock />
        <ListItemEdit users={users} />
        <List listId={listId} items={items} users={users} />
      </Stack>
      <Stack>
        <Title order={2}>Members</Title>
        <ListMembers listId={listId} members={members} users={users} />
        {/*TODO: link to checkout page*/}
        <Button>Checkout</Button>
      </Stack>
    </Group>
  );
};

export default ListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listId = Number(context.query.listId);
  const [users, items, members, events] = await Promise.all([
    getUsers(),
    getListItems(listId),
    getListMembers(listId),
    getListItemEvents([listId]),
  ]);

  return { props: { listId, items, members, events, users } };
};
