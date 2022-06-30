import { useState } from 'react';
import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { List, User } from '@/types/index';
import { Box, Stack, Paper, Button, Modal, Group } from '@mantine/core';
import { } from '@/components/index';
import { getLists } from '@/server/lists/index';
import { getUsers } from '@/server/users/index';

interface Props {
  lists: List[];
  users: User[];
}

const ListsPage: NextPage<Props> = ({ lists, users }) => {
  console.log(lists, users);
  return (
    <>
    </>
  );
}

export default ListsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const lists = await getLists();
  const users = await getUsers();

  return { props: { lists, users } };
}
