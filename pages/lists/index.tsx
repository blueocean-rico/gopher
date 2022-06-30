import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { List, User } from '@/types/index';
import { } from '@/components/index';
import { getLists } from '@/server/lists/index';
import { getUsers } from '@/server/users/index';

interface Props {
  lists: List[];
  users: User[];
}

const ListsPage: NextPage<Props> = ({ lists, users }) => {
  return (
    <>
    </>
  );
}

export default ListsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const lists = await getLists();
  const users = await getUsers();

  return { props: { lists, users } };
}
