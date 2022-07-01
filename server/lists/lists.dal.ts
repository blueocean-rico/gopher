import sql from '@/db/index';
import type { PreDbList, List, User } from '@/types/index';

export function getLists(listId?: number) {
  return sql<List[]>`
    SELECT * FROM lists WHERE id IS NOT NULL ${
      listId !== undefined ? sql`AND id = ${listId}` : sql``
    };
  `;
}

export function addList(list: PreDbList, users: User[]) {
  return sql`
    WITH inserted_list AS (
      INSERT INTO lists ${sql(list)}
      RETURNING *)
    INSERT INTO lists_users (list_id, user_id)
      SELECT * FROM (
        (SELECT id FROM inserted_list) AS alias1 CROSS JOIN unnest(
          ${users.map((user) => user.id)}::integer[]
        )
      ) AS alias2;
  `;
}

export function deleteList(listId: number) {
  return sql`
    DELETE FROM lists WHERE id = ${listId};
  `;
}

export function modifyList(list: List) {
  const { name, location } = list;
  return sql`
    UPDATE lists SET ${sql({ name, location })} WHERE id = ${list.id};
  `;
}
