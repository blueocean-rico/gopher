import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  AddListItemEvent,
  DeleteListItemEvent,
  ModifyListItemEvent,
} from '@/types/index';
import {
  addShoppingListItem,
  modifyShoppingListItem,
  deleteShoppingListItem,
} from '@/server/lists/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const event = <AddListItemEvent>req.body;
    try {
      await addShoppingListItem(event);
      res.status(201).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'PUT') {
    const event = <ModifyListItemEvent>req.body;
    try {
      await modifyShoppingListItem(event);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === 'DELETE') {
    const event = <DeleteListItemEvent>req.body;
    try {
      await deleteShoppingListItem(event);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else {
    res.status(400).send(undefined);
  }
}
