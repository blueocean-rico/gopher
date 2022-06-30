import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/types/index';
import { addListMembers, deleteListMembers } from '@/server/lists/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const listId = Number(req.query.listId);
    const { users } = <{ users: User[] }>req.body;
    try {
      await addListMembers(listId, users);
      res.status(201).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'DELETE') {
    const listId = Number(req.query.listId);
    const { users } = <{ listId: number; users: User[] }>req.body;
    try {
      await deleteListMembers(listId, users);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else {
    res.status(400).send(undefined);
  }
}
