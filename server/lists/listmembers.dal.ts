import sql from '@/db/index';
import type { Member, User } from '@/types/index';

export async function getListMembers(listId: number) {
  return await sql<Member[]>`
    SELECT u.*
    FROM lists_users l_u INNER JOIN users u ON l_u.user_id = u.id
    WHERE l_u.list_id = ${listId};
  `;
}

export function addListMembers(listId: number, users: User[]) {
  return sql`
    INSERT INTO lists_users ${sql(
      users.map((user) => ({
        list_id: listId,
        user_id: user.id,
      })),
      "user_id",
      "list_id"
    )}
  `;
}

export function deleteListMembers(listId: number, users: User[] | Member[]) {
  return sql`
    DELETE FROM lists_users WHERE list_id = ${listId} AND
      user_id IN ${sql(users.map((user) => user.id))};
  `;
}

export async function getGopher(listId: number) {
  const result = await sql<User[]>`
    SELECT gopher
    FROM lists_users l_u
    WHERE l_u.gopher = true and list_id = ${listId};
  `;

  return result[0];
}

export async function setGopher(listId: number, user: User) {
  return sql`
    WITH updated_gopher AS (
      UPDATE lists_users
      SET gopher = false
      WHERE list_id = ${listId} and gopher = true
    )
      UPDATE lists_users
      SET gopher = true
      WHERE list_id = ${listId} and user_id = ${user.id}
  `;
}
