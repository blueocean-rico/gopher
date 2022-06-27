import sql from '@/db/index'

export function getShoppingListItems(listIds) {
}

export function getShoppingListEvents(listIds) {
}

export function getShoppingListMembers(listIds) {
}

export function addShoppingListItem(item) {
  //insert into users as well
  return sql`

    WITH inserted_item AS (
      INSERT INTO list_items (
        list_id,
        name,
        price
      ) VALUES (
        ${item.list_id},
        ${item.name},
        ${item.price}
      ) RETURNING id
    ) INSERT INTO list_events (
      event_type,
      end_id
    ) VALUES (
      'add',
      inserted_item
    ) RETURNING (
    SELECT * FROM list_items WHERE id = inserted_item;

    WITH inserted_item AS (
      INSERT INTO list_items (
        list_id,
        name,
        price
      ) VALUES (
        1,
        'brocolli',
        NULL
      ) RETURNING *
    ),
    inserted_event AS (
      INSERT INTO list_events (
        event_type,
        end_id
      ) SELECT 'add', id FROM inserted_item
      RETURNING *
    )
    SELECT json_build_object(
      'id', inserted_item.id,
      'name', inserted_item.name,
      'price', inserted_item.price,
      'type', inserted_event.event_type
    ) AS result
    FROM inserted_item, inserted_event;

  `;

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
