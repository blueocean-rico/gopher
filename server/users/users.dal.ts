import sql from '@/db/index';
import { User } from '@/types/index';

export function addUser (user: Omit<User, 'id'>) {
  return sql`
    INSERT INTO users ${
      sql(user, 'email', 'nickname', 'picture')
    }
  `;
}