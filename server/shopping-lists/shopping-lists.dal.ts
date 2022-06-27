import sql from '@/db/index'

export function getShoppingListItems(listIds) {
}

export function getShoppingListEvents(listIds) {
}

export function getShoppingListMembers(listIds) {
}

insert into users(name) values ('me');

export 


item.users.map(user => `(inserted_item.id, ${user.id})`).join(', ')
let item = {list_id: 1, name:'carrot', price:100, users: [{id:1, name: 'me'}]}

test(item).strings
test(item).args[3].first[0].list_item_id;
test(item).then(x=> console.log(x));

test = function addShoppingListItem(item) {
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
      ) RETURNING *
    ),
    inserted_users AS (
      INSERT INTO list_items_users
      ${sql(item.users.map((user) => (
        {
          list_item_id: sql`inserted_itemid`,
          user_id: user.id
        }
      )))}
      RETURNING *
    ),
    inserted_event AS (
      INSERT INTO list_events (
        event_type,
        end_id
      ) SELECT 'add', id FROM inserted_item
      RETURNING *
    ),
    SELECT json_build_object(
      'id', inserted_item.id,
      'name', inserted_item.name,
      'price', inserted_item.price,
      'users', users,
      'type', inserted_event.event_type
    ) AS result
    FROM inserted_item, inserted_event, (
      SELECT json_agg(
        json_build_object(
          'id', id,
          'name', name
        ) users
      ) FROM inserted_users
    );
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
