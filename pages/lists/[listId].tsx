import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { ListItem, User } from '@/types/index';
import { } from '@/components/index';
import { getListItems, getListMembers } from '@/server/lists/index';

interface Props {
  items: ListItem[];
  members: User[];
}

const ListPage: NextPage<Props> = ({ items, members }) => {
  console.log(items, members);
  return (
    <>
    </>
  );
}

export default ListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listId = Number(context.query.listId);
  const items = await getListItems(listId);
  const members = await getListMembers(listId);

  return { props: { items, members } };
}
