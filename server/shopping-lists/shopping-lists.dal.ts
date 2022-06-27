import sql from '@/db/index'

export async function getShoppingListItems(listIds) {
  const result = await sql`
    SELECT json_build_object(
      list_id, json_agg(selected_list_items)
    ) AS lists FROM (
      SELECT
        li.id AS list_item_id,
        li.list_id AS list_id,
        li.name AS name,
        li.price AS price,
        json_agg(u.id) AS users
      FROM
        list_items li
          LEFT JOIN list_items_users li_u ON li.id = li_u.list_item_id
          LEFT JOIN users u ON u.id = li_u.id
      WHERE li.active = true AND li.list_id IN ${sql(listIds)}
      GROUP BY li.id
    ) AS selected_list_items
    GROUP BY list_id;
  `;

  return result[0].lists;
}

export function getShoppingListEvents(listIds) {
}

export function getShoppingListMembers(listIds) {
}

export async function addShoppingListItem(item) {
  const result = await sql`
    WITH inserted_item AS (
      INSERT INTO list_items (list_id, name, price)
      VALUES (${item.list_id}, ${item.name}, ${item.price})
      RETURNING *
    ),
    inserted_users AS (
      INSERT INTO list_items_users (list_item_id, user_id)
      SELECT * FROM (
        (SELECT id FROM inserted_item) AS alias1 CROSS JOIN unnest(
          ${item.users.map((user) => user.id)}::integer[]
        )
      ) AS alias2
      RETURNING *
    ),
    inserted_event AS (
      INSERT INTO list_events (event_type, end_id)
      SELECT 'add', id FROM inserted_item
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

export function deleteShoppingListItem(item) {
  //add list_event
  return sql`
    UPDATE list_items SET active = false
      WHERE id = ${item.id};
  `;
}

export function modifyShoppingListItem(item) {
}
