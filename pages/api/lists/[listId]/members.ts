import type { NextApiRequest, NextApiResponse } from "next";
import type { User, Member } from "@/types/index";
import {
  getListMembers,
  addListMembers,
  deleteListMembers,
  setGopher,
} from "@/server/lists/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const listId = Number(req.query.listId);
    try {
      const members = await getListMembers(listId);
      res.status(200).send(members);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === "POST") {
    const listId = Number(req.query.listId);
    const { users } = <{ users: User[] }>req.body;
    try {
      await addListMembers(listId, users);
      res.status(201).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === "DELETE") {
    const listId = Number(req.query.listId);
    const { users } = <{ listId: number; users: Member[] }>req.body;
    try {
      await deleteListMembers(listId, users);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else if (req.method === "PUT") {
    const listId = Number(req.query.listId);
    const { user } = <{ listId: number; user: Member }>req.body;
    try {
      await setGopher(listId, user);
      res.status(204).send(undefined);
    } catch (error) {
      console.log(error);
      res.status(500).send(undefined);
    }
  } else {
    res.status(400).send(undefined);
  }
}
