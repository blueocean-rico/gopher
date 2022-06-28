import postgres from 'postgres';
import * as Types from '@/types/index';
import { addUser } from '@/server/users/index';
import { addShoppingList, deleteShoppingList, modifyShoppingList, getShoppingLists } from '@/server/lists/lists.dal';

const sql = postgres('postgres://postgres:postgres@localhost:5433/gopher');

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
      await sql`DELETE FROM users`;

      expect(results.length).toEqual(1);

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
      await sql`DELETE FROM lists`;

      expect(results.length).toEqual(1);

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

      expect(results.length).toEqual(0);
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

      await sql`DELETE FROM lists`;
    });
  });

  describe('listmembers', () => {
  });

  describe('listitems', () => {
  });

  describe('listevents', () => {
  });
});
