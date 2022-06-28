import sql from '@/db/index';
import { ListItemEvent } from '@/types/index';

export function getShoppingListItems(listId: number) {
  return sql`
    SELECT
      li.id AS id,
      li.list_id AS list_id,
      li.name AS name,
      li.price AS price,
      json_agg(json_build_object('id', u.id)) AS users
    FROM
      list_items li
        LEFT JOIN list_items_users li_u ON li.id = li_u.list_item_id
        LEFT JOIN users u ON u.id = li_u.id
    WHERE li.active = true AND li_u.active = true AND li.list_id = ${listId}
    GROUP BY li.id;
  `;
}

export function getShoppingListEvents(listIds: number[]) {
  return sql`
    SELECT e.id, e.list_id, e.event_type,
      json_build_object('id', u.id, 'name', u.name) AS user,
      CASE WHEN e.start_id IS NULL THEN NULL ELSE json_build_object(
        'id', li1.id,
        'list_id', li1.list_id,
        'name', li1.name,
        'price', li1.price,
        'users', json_agg(json_build_object('id', u1.id))
      ) END AS start,
      CASE WHEN e.end_id IS NULL THEN NULL ELSE json_build_object(
        'id', li2.id,
        'list_id', li2.list_id,
        'name', li2.name,
        'price', li2.price,
        'users', json_agg(json_build_object('id', u2.id))
      ) END AS end,
      e.event_date
    FROM
      list_events e
        LEFT JOIN list_items li1 ON e.start_id = li1.id
        LEFT JOIN list_items_users li_u1 ON li1.id = li_u1.list_item_id
        LEFT JOIN users u1 ON u1.id = li_u1.user_id
        LEFT JOIN list_items li2 ON e.end_id = li2.id
        LEFT JOIN list_items_users li_u2 ON li2.id = li_u2.list_item_id
        LEFT JOIN users u2 ON u2.id = li_u2.user_id
        LEFT JOIN users u ON e.user_id = u.id
    --- WHERE e.list_id IN (1,2) 
    WHERE e.list_id IN ${sql(listIds)}
    GROUP BY e.id, li1.id, u.id, li2.id
  `;
}

export async function getShoppingListMembers(listId: number) {
   const result = await sql`
    SELECT json_build_object('id', u.id, 'name', u.name)
    FROM lists_users l_u INNER JOIN users u ON l_u.user_id = u.id
    WHERE l_u.list_id = ${listId};
  `;

  return {list_id: listId, users: result};
}

export async function addShoppingListItem(event: ListItemEvent) {
  const result = await sql`
    WITH inserted_item AS (
      INSERT INTO list_items (list_id, name, price)
      VALUES (${event.end.list_id}, ${event.end.name}, ${event.end.price})
      RETURNING *
    ),
    inserted_users AS (
      INSERT INTO list_items_users (list_item_id, user_id)
      SELECT * FROM (
        (SELECT id FROM inserted_item) AS alias1 CROSS JOIN unnest(
          ${event.end.users.map((user) => user.id)}::integer[]
        )
      ) AS alias2
      RETURNING *
    ),
    inserted_event AS (
      INSERT INTO list_events (list_id, event_type, user_id, end_id)
      SELECT ${event.list_id}, 'add', ${event.created_by.id}, id FROM inserted_item
      RETURNING *
    )
    SELECT
      inserted_item.id AS id,
      inserted_item.name AS name,
      inserted_item.price AS price,
      users_array.users AS users,
      inserted_event.event_date AS date
    FROM inserted_item, inserted_event, (
      SELECT json_agg(
        json_build_object(
          'id', id
        )
      ) AS users FROM inserted_users
    ) AS users_array;
  `;

  return result[0];
}

export function deleteShoppingListItem(event: ListItemEvent) {
  return sql`
    UPDATE list_items SET active = false
      WHERE id = ${event.end.id};

    INSERT INTO list_events (list_id, event_type, user_id, start_id) 
    VALUES (${event.list_id}, 'delete', ${event.created_by.id}, ${event.end.id});
  `;
}

export function modifyShoppingListItem(event: ListItemEvent) {
  return sql`
    WITH end_item AS (
      INSERT INTO list_items (list_id, name, price)
      VALUES (${event.end.list_id}, ${event.end.name}, ${event.end.price})
      RETURNING *
    ),
    end_users AS (
      INSERT INTO list_items_users (list_item_id, user_id)
      SELECT * FROM (
        (SELECT id FROM end_item) AS alias1 CROSS JOIN unnest(
          ${event.end.users.map((user) => user.id)}::integer[]
        )
      ) AS alias2
      RETURNING *
    ),
    inserted_event AS (
      INSERT INTO list_events (list_id, event_type, user_id, start_id, end_id)
      SELECT ${event.list_id}, 'modify', ${event.created_by.id}, ${event.start.id}, id FROM end_item
      RETURNING *
    )
    UPDATE list_items SET active = false
        WHERE id = ${event.start.id};
  `;
}
