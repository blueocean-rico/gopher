import sql from '@/db/index';
import type { ListItemEvent } from '@/types/index';

export function getShoppingListEvents(listIds: number[]) {
  return sql<ListItemEvent[]>`
    SELECT e.id, e.list_id, e.event_type,
      json_build_object('id', u.id, 'email', u.email,
        'nickname', u.nickname, 'picture', u.picture) AS createdBy,
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
      e.event_date AS date
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
    ORDER BY date DESC;
  `;
}
