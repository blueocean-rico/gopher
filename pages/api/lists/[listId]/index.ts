import type { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "@/server/users/index";
import {
  getListItems,
  getListMembers,
  getListItemEvents,
} from "@/server/lists/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const listId = Number(req.query.listId);
      const [users, items, members, events] = await Promise.all([
        getUsers(),
        getListItems(listId),
        getListMembers(listId),
        getListItemEvents([listId]),
      ]);
      res.status(200).send({ listId, items, members, events, users });
    } catch (err) {
      console.log(err);
      res.status(500).send(undefined);
    }
  }
}
