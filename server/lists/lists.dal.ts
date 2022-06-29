import sql from '@/db/index';
import { List } from '@/types/index';

export async function getShoppingLists(userId?: number) {
  const lists = await sql<List[]>`
    SELECT * FROM lists;
  `;
  return lists;
}

export function addShoppingList(list: { name: string }) {
  return sql`
    INSERT INTO lists ${sql(list, 'name')};
  `;
}

export function deleteShoppingList(listId: number) {
  return sql`
    DELETE FROM lists WHERE id = ${listId};
  `;
}

export function modifyShoppingList(list: { id: number; name: string }) {
  return sql`
    UPDATE lists SET name = ${list.name} WHERE id = ${list.id};
  `;
}
