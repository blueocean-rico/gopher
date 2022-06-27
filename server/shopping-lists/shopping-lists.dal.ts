import sql from '@/db/index'

export function getShoppingListItems(listId) {
  return sql`
    SELECT
      li.id AS list_item_id,
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

export function getShoppingListEvents(listIds) {
  const result = await sql`
    SELECT json_agg(selected_events) AS events FROM (
      SELECT es.start FROM (
        SELECT e.event_type, e.user_id, e.end_id, e.event_date, json_build_object(
          'list_item_id', li.id,
          'list_id', li.list_id,
          'name', li.name,
          'price', li.price,
          'users', json_agg(u1.id)
        ) AS start
        FROM
          list_events e
            LEFT JOIN users u ON e.user_id = u.id
            LEFT JOIN list_items li1 ON e.start_id = li1.id
            LEFT JOIN list_items_users li_u1 ON li1.id = li_u1.list_item_id
            LEFT JOIN users u1 ON u1.id = li_u1.user_id
        WHERE li.list_id IN (1,2)
        --- WHERE li.list_id IN ${sql(listIds)}
        GROUP BY li1.id
      ) AS es 
        LEFT JOIN list_items li2 ON es.end_id = li2.id
        LEFT JOIN list_items_users li_u2 ON li2.id = li_u2.list_item_id
        LEFT JOIN users u2 ON u2.id = li_u2.user_id

  AS selected_events

    GROUP BY list_id;
  `;

  return result[0].events;
}
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
