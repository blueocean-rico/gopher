import { User } from '@/types/index';
import { insertUser } from "./users.dal";

export function addUser(user: Omit<User, 'id'>) {
  try {
    insertUser(user);
  } catch (error) {
  }
}
