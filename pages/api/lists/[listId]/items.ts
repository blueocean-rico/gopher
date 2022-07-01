import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  PreDbAddListItemEvent,
  PreDbDeleteListItemEvent,
  PreDbModifyListItemEvent,
} from '@/types/index';
import {
  addListItem,
  modifyListItem,
  deleteListItem,
} from '@/server/lists/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const event = <PreDbAddListItemEvent>req.body;
    try {
      await addListItem(event);
      res.status(201).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'PUT') {
    const event = <PreDbModifyListItemEvent>req.body;
    try {
      await modifyListItem(event);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'DELETE') {
    const event = <PreDbDeleteListItemEvent>req.body;
    try {
      await deleteListItem(event);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else {
    res.status(400).send(undefined);
  }
}
