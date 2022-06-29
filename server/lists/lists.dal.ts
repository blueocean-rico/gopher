import sql from '@/db/index';
import type { List, User } from '@/types/index';

export async function getShoppingLists(userId?: number) {
  const lists = await sql<List[]>`
    SELECT * FROM lists;
  `;
  return lists;
}

export function addShoppingList(list: { name: string }, users: User[]) {
  return sql`
    WITH inserted_list AS (
      INSERT INTO lists ${sql(list, 'name')};
      RETURNING *)
    INSERT INTO lists_users (list_id, user_id)
      SELECT * FROM (
        (SELECT id FROM inserted_list) AS alias1 CROSS JOIN unnest(
          ${users.map((user) => user.id)}::integer[]
        )
      ) AS alias2;
  `;
}

export function deleteShoppingList(listId: number) {
  return sql`
    DELETE FROM lists WHERE id = ${listId};
  `;
}

export function modifyShoppingList(list: List) {
  return sql`
    UPDATE lists SET name = ${list.name} WHERE id = ${list.id};
  `;
}
