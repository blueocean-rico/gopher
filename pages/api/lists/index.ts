import type { NextApiRequest, NextApiResponse } from 'next';
import type { List, User } from '@/types/index';
import { addList, modifyList, deleteList } from '@/server/lists/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { list, users } = <{ list: { name: string }; users: User[] }>req.body;
    try {
      await addList(list, users);
      res.status(201).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'PUT') {
    const list = <List>req.body;
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
  } else {
    res.status(400).send(undefined);
  }
}
