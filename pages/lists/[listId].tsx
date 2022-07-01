import { Button, Title, Group, Stack, ActionIcon } from '@mantine/core';
import { Clock } from 'tabler-icons-react';
import type { NextPage } from 'next';
import Link from 'next/link';
import type { ListItem, Member, User, ListItemEvent } from '@/types/index';
import { useRouter } from 'next/router';
import { List, ListItemEdit, ListMembers } from '@/components/index';
import useSWR from 'swr';

interface Props {
  listId: number;
  items: ListItem[];
  members: Member[];
  events: ListItemEvent[];
  users: User[];
}

const ListPage: NextPage<Props> = () => {
  const router = useRouter();
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(`/api/lists/${router.query.listId}`, fetcher, {
    refreshInterval: 10,
  });
  if (!data) {
    return <div></div>;
  }
  if (!data.items) {
    data.items = [];
    data.members = [];
  }
  const { items, members, events, users, listId, list } = data;
  console.log(list);
  console.log('items', items, 'members', members, 'events', events);
  return (
    <Stack>
      <Group align="baseline" spacing="lg">
        <Title order={1}>{list.name}</Title>{' '}
        <ActionIcon size={24}>
          <Clock />
        </ActionIcon>
      </Group>
      <Group align="stretch" spacing="xl">
        <Stack justify="flex-start">
          <ListItemEdit listId={listId} item={undefined} users={users} />
          <List listId={listId} items={items} users={users} />
        </Stack>
        <Stack justify="flex-start">
          <ListMembers listId={listId} members={members} users={users} />
          {/*<Link href={`lists/${list.id}/checkoout`} passHref>*/}
          <Link href={`lists/checkout`} passHref>
            <Button color="blue">Checkout</Button>
          </Link>
        </Stack>
      </Group>
    </Stack>
  );
};

export default ListPage;
