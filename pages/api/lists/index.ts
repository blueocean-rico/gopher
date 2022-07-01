import type { NextApiRequest, NextApiResponse } from 'next';
import type { PreDbList, List, User } from '@/types/index';
import { getUsers } from '@/server/users/index';
import { addList, modifyList, deleteList, getLists, getListItemEvents } from '@/server/lists/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { list, users } = <{ list: PreDbList; users: User[] }>req.body;
    try {
      await addList(list, users);
      res.status(201).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'PUT') {
    const { list } = <{ list: List }>req.body;
    try {
      await modifyList(list);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'DELETE') {
    const { listId } = <{ listId: number }>req.body;
    try {
      await deleteList(listId);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'GET') {
    const lists = await getLists();
    const users = await getUsers();
    const listIds = lists.map((list) => list.id);
    const events = await getListItemEvents(listIds);
    res.status(200).send((JSON.stringify({ lists, users, events })))
  } else {
    res.status(400).send(undefined);
  }
}
