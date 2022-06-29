import sql from '@/db/index';
import {
  ListItem,
  AddListItemEvent,
  DeleteListItemEvent,
  ModifyListItemEvent,
} from '@/types/index';

export async function getShoppingListItems(listId: number) {
  const results = (await sql`
    SELECT
      li.id AS id,
      li.list_id AS list_id,
      li.name AS name,
      li.price AS price,
      json_agg(
        json_build_object('id', u.id, 'email', u.email,
        'nickname', u.nickname, 'picture', u.picture)
      ) AS users
    FROM
      list_items li
        LEFT JOIN list_items_users li_u ON li.id = li_u.list_item_id
        LEFT JOIN users u ON u.id = li_u.user_id
    WHERE li.active = true AND li_u.active = true AND li.list_id = ${listId}
    GROUP BY li.id;
  ` as any) as ListItem[];

  results.forEach((listItem: any) => {
    listItem.price = Number(listItem.price);
  });

  return results;
}

export async function addShoppingListItem(event: Omit<AddListItemEvent, 'id' | 'date'>) {
  const result = await sql`
    WITH inserted_item AS (
      INSERT INTO list_items (list_id, name, price)
      VALUES (${event.end.listId}, ${event.end.name}, ${event.end.price})
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
      SELECT ${event.listId}, 'add', ${
    event.createdBy.id
  }, id FROM inserted_item
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

export function deleteShoppingListItem(event: Omit<DeleteListItemEvent, 'id' | 'date'>) {
  return sql`
    WITH updated_item AS (UPDATE list_items SET active = false
      WHERE id = ${event.start.id})
    INSERT INTO list_events (list_id, event_type, user_id, start_id) 
    VALUES (${event.listId}, 'delete', ${event.createdBy.id}, ${
    event.start.id
  });
  `;
}

export function modifyShoppingListItem(event: Omit<ModifyListItemEvent, 'id' | 'date'>) {
  return sql`
    WITH end_item AS (
      INSERT INTO list_items (list_id, name, price)
      VALUES (${event.end.listId}, ${event.end.name}, ${event.end.price})
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
      SELECT ${event.listId}, 'modify', ${event.createdBy.id}, ${
    event.start.id
  }, id FROM end_item
      RETURNING *
    )
    UPDATE list_items SET active = false
        WHERE id = ${event.start.id};
  `;
}
