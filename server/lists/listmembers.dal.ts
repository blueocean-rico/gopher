import sql from '@/db/index';
import { User } from '@/types/index';

export async function getShoppingListMembers(listId: number) {
  const result = await sql<User[]>`
    SELECT u.*
    FROM lists_users l_u INNER JOIN users u ON l_u.user_id = u.id
    WHERE l_u.list_id = ${listId};
  `;

  return { list_id: listId, users: result };
}

export function addShoppingListMembers(listId: number, users: User[]) {
  return sql`
    INSERT INTO lists_users ${sql(
      users.map((user) => ({
        list_id: listId,
        user_id: user.id,
      })),
      'user_id',
      'list_id'
    )}
  `;
}

export function deleteShoppingListMembers(listId: number, users: User[]) {
  return sql`
    DELETE FROM lists_users WHERE list_id = ${listId} AND
      user_id IN ${sql(users.map((user) => user.id))};
  `;
}
