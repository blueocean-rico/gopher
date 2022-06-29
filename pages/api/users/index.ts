import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/types/index';
import {
addUser
} from '@/server/users/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = <Omit<User, 'id'>>req.body;
    try {
      await addUser(user);
      res.status(201).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else {
    res.status(400).send(undefined);
  }
}
