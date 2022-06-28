import postgres from 'postgres';
import * as Types from '@/types/index';
import { addUser } from '@/server/users/index';
import {
  addShoppingList,
  deleteShoppingList,
  modifyShoppingList,
  getShoppingLists,
  addShoppingListMembers,
  getShoppingListMembers,
  deleteShoppingListMembers,
} from '@/server/lists/index';

const sql = postgres('postgres://postgres:postgres@localhost:5433/gopher');

afterEach(async () => {
  await sql`DELETE FROM users`;
  await sql`DELETE FROM lists`;
});

afterAll(async () => {
  await sql.end();
});

describe('server', () => {
  describe('users', () => {
    it('should create a user', async () => {
      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };

      await addUser(user);

      const results = await sql`SELECT * FROM users`;
      expect(results).toHaveLength(1);

      const { nickname, email, picture } = results[0];
      expect(nickname).toEqual(user.nickname);
      expect(email).toEqual(user.email);
      expect(picture).toEqual(user.picture);
    });
  });

  describe('lists', () => {
    it('should add a shopping list', async () => {
      const list = { name: 'testlist' };
      await addShoppingList(list);

      const results = await sql`SELECT * FROM lists`;
      expect(results).toHaveLength(1);

      const { name } = results[0];
      expect(name).toEqual(list.name);
    });

    it('should delete a shopping list', async () => {
      const list = { name: 'testlist' };
      await addShoppingList(list);
      let results = await sql`SELECT * FROM lists`;
      const listId = results[0].id;

      await deleteShoppingList(listId);
      results = await sql`SELECT * FROM lists`;

      expect(results).toHaveLength(0);
    });

    it('should modify a shopping list', async () => {
      const list = { name: 'testlist' };
      await addShoppingList(list);
      let results = await sql`SELECT * FROM lists`;

      const addedList = results[0] as { id: number; name: string };
      addedList.name = 'newname';
      await modifyShoppingList(addedList);

      results = await sql`SELECT * FROM lists WHERE id = ${addedList.id}`;
      const modifiedList = results[0];
      expect(modifiedList.name).toBe('newname');
    });
  });

  describe('listmembers', () => {
    it('should add a shopping list member', async () => {
      const list = { name: 'testlist' };
      await addShoppingList(list);

      let results = await sql`SELECT * FROM lists`;
      const listId = results[0].id;

      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };
      await addUser(user);

      results = await sql`SELECT * FROM users`;
      const addedUser = results[0] as Types.User;

      await addShoppingListMembers(listId, [addedUser]);
      results = await sql`SELECT * FROM lists_users`;

      expect(results[0].list_id).toEqual(listId);
      expect(results[0].list_id).toEqual(listId);
    });

    it('should get shopping list members', async () => {
      const list = { name: 'testlist' };
      await addShoppingList(list);

      let results = await sql`SELECT * FROM lists`;
      const listId = results[0].id;

      const user1 = {
        nickname: 'test1',
        email: 'test1@email.com',
        picture: 'https://picture1.com',
      };
      const user2 = {
        nickname: 'test2',
        email: 'test2@email.com',
        picture: 'https://picture2.com',
      };

      await addUser(user1);
      await addUser(user2);

      results = await sql`SELECT * FROM users`;
      const [addedUser1, addedUser2] = (results as any) as Types.User[];

      await addShoppingListMembers(listId, [addedUser1, addedUser2]);
      const members = await getShoppingListMembers(listId);

      expect(members.users).toContainEqual(addedUser1);
      expect(members.users).toContainEqual(addedUser2);
    });

    it('should delete a shopping list member', async () => {
      const list = { name: 'testlist' };
      await addShoppingList(list);

      let results = await sql`SELECT * FROM lists`;
      const listId = results[0].id;

      const user1 = {
        nickname: 'test1',
        email: 'test1@email.com',
        picture: 'https://picture1.com',
      };
      const user2 = {
        nickname: 'test2',
        email: 'test2@email.com',
        picture: 'https://picture2.com',
      };

      await addUser(user1);
      await addUser(user2);

      results = await sql`SELECT * FROM users`;
      const [addedUser1, addedUser2] = (results as any) as Types.User[];

      await addShoppingListMembers(listId, [addedUser1, addedUser2]);
      await deleteShoppingListMembers(listId, [addedUser1]);
      const members = await getShoppingListMembers(listId);

      expect(members.users).not.toContainEqual(addedUser1);
      expect(members.users).toContainEqual(addedUser2);
    });
  });

  describe('listitems', () => {});

  describe('listevents', () => {});
});
