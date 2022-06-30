import sql from '@/db/index';
import type { User } from '@/types/index';

export function getUsers() {
  return sql<User[]>`
    SELECT * FROM users;
  `;
}

export function addUser(user: Omit<User, 'id'>) {
  return sql`
    INSERT INTO users ${sql(user, 'email', 'nickname', 'picture')}
  `;
}
