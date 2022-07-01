import sql from '@/db/index';
import type { PreDbUser, User } from '@/types/index';

export function getUsers() {
  return sql<User[]>`
    SELECT * FROM users;
  `;
}

export function addUser(user: PreDbUser | Omit<PreDbUser, 'picture'>) {
  return sql`
    INSERT INTO users ${sql(user)}
  `;
}
