import type * as Types from '@/types/index';
import sql from '@/db/index';
import { addUser, getUsers } from '@/server/users/index';
import {
  addList,
  deleteList,
  modifyList,
  getLists,
  addListMembers,
  getListMembers,
  deleteListMembers,
  addListItem,
  getListItems,
  deleteListItem,
  modifyListItem,
  getListItemEvents,
} from '@/server/lists/index';

beforeAll(async () => {
  await sql`DELETE FROM list_events`;
  await sql`DELETE FROM lists`;
  await sql`DELETE FROM lists_users`;
  await sql`DELETE FROM list_items`;
  await sql`DELETE FROM list_items_users`;
  await sql`DELETE FROM users`;
});

afterEach(async () => {
  await sql`DELETE FROM list_events`;
  await sql`DELETE FROM lists`;
  await sql`DELETE FROM lists_users`;
  await sql`DELETE FROM list_items`;
  await sql`DELETE FROM list_items_users`;
  await sql`DELETE FROM users`;
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

    it('should get all users', async () => {
      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };
      const user2 = {
        nickname: 'test2',
        email: 'test2@email.com',
        picture: 'https://picture2.com',
      };

      await addUser(user);
      await addUser(user2);

      const results = await getUsers();
      expect(results).toHaveLength(2);
    });
  });

  describe('lists', () => {
    it('should add a shopping list', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

      const results = await sql`SELECT * FROM lists`;
      expect(results).toHaveLength(1);

      const { name, location } = results[0];
      expect(name).toEqual(list.name);
      expect(location).toEqual(list.location);
    });

    it('should get the shopping lists', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

      const results = await getLists();
      expect(results).toHaveLength(1);
      expect(results[0].name).toEqual(list.name);
      expect(results[0].location).toEqual(list.location);
    });

    it('should delete a shopping list', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);
      let results = await sql`SELECT * FROM lists`;
      const listId = results[0].id;

      await deleteList(listId);
      results = await getLists();

      expect(results).toHaveLength(0);
    });

    it('should modify a shopping list', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);
      let results = await getLists();

      const addedList = results[0];
      addedList.name = 'newname';
      await modifyList(addedList);

      results = await getLists();
      const modifiedList = results[0];
      expect(modifiedList.name).toBe('newname');
    });
  });

  describe('listmembers', () => {
    it('should add a shopping list member', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

      const listResults = await getLists();
      const listId = listResults[0].id;

      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };
      await addUser(user);

      let userResults = await sql<Types.User[]>`SELECT * FROM users`;
      const addedUser = userResults[0];

      await addListMembers(listId, [addedUser]);
      const listUserResults = await sql<
        {
          listId: number;
          userId: number;
        }[]
      >`SELECT * FROM lists_users`;

      expect(listUserResults[0].listId).toEqual(listId);
      expect(listUserResults[0].listId).toEqual(listId);
    });

    it('should get shopping list members', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

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

      const [addedUser1, addedUser2] = await sql<
        Types.User[]
      >`SELECT * FROM users`;

      await addListMembers(listId, [addedUser1, addedUser2]);
      const members = await getListMembers(listId);

      expect(members).toContainEqual(addedUser1);
      expect(members).toContainEqual(addedUser2);
    });

    it('should delete a shopping list member', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

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

      const [addedUser1, addedUser2] = await sql<
        Types.User[]
      >`SELECT * FROM users`;

      await addListMembers(listId, [addedUser1, addedUser2]);
      await deleteListMembers(listId, [addedUser1]);
      const members = await getListMembers(listId);

      expect(members).not.toContainEqual(addedUser1);
      expect(members).toContainEqual(addedUser2);
    });
  });

  describe('listitems', () => {
    it('should add a shopping list item', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

      let results = await sql<Types.List[]>`SELECT * FROM lists`;
      const listId = results[0].id;

      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };
      await addUser(user);

      const [addedUser] = await sql<Types.User[]>`SELECT * FROM users`;

      await addListMembers(listId, [addedUser]);

      const listItem = {
        listId,
        name: 'test list item',
        price: 100,
        users: [addedUser],
      };

      await addListItem({
        listId,
        createdBy: addedUser,
        eventType: 'add',
        start: null,
        end: { ...listItem, id: 1, active: true },
      });
      const itemResult = await sql<Types.ListItem[]>`SELECT * FROM list_items`;
      const itemUserResult = await sql<
        { userId: number }[]
      >`SELECT * FROM list_items_users`;

      expect(itemResult).toHaveLength(1);
      expect(itemResult[0].listId).toEqual(listItem.listId);
      expect(itemResult[0].name).toEqual(listItem.name);
      expect(Number(itemResult[0].price)).toEqual(listItem.price);
      expect(itemUserResult).toHaveLength(1);
      expect(itemUserResult[0].userId).toEqual(addedUser.id);
    });

    it('should get shopping list items', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

      let results = await sql<Types.List[]>`SELECT * FROM lists`;
      const listId = results[0].id;

      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };
      await addUser(user);

      const [addedUser] = await sql<Types.User[]>`SELECT * FROM users`;

      await addListMembers(listId, [addedUser]);

      const listItem = {
        listId: listId,
        name: 'test list item',
        price: 100,
        users: [addedUser],
      };

      await addListItem({
        listId,
        createdBy: addedUser,
        eventType: 'add',
        start: null,
        end: { ...listItem, id: 1, active: true },
      });

      const listItems = await getListItems(listId);
      expect(listItems[0].listId).toEqual(listItem.listId);
      expect(listItems[0].name).toEqual(listItem.name);
      expect(listItems[0].price).toEqual(listItem.price);
      expect(listItems[0].users).toEqual([addedUser]);
    });

    it('should delete a shopping list item', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

      let results = await sql<Types.List[]>`SELECT * FROM lists`;
      const listId = results[0].id;

      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };
      await addUser(user);

      const [addedUser] = await sql<Types.User[]>`SELECT * FROM users`;

      await addListMembers(listId, [addedUser]);

      const listItem = {
        listId,
        name: 'test list item',
        price: 100,
        users: [addedUser],
      };

      await addListItem({
        listId,
        createdBy: addedUser,
        eventType: 'add',
        start: null,
        end: { ...listItem, id: 1, active: true },
      });

      let listItems = await getListItems(listId);

      await deleteListItem({
        listId,
        createdBy: addedUser,
        eventType: 'delete',
        end: null,
        start: listItems[0],
      });

      listItems = await getListItems(listId);
      expect(listItems).toHaveLength(0);
    });

    it('should modify a shopping list item', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

      let results = await sql<Types.List[]>`SELECT * FROM lists`;
      const listId = results[0].id;

      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };
      await addUser(user);

      const [addedUser] = await sql<Types.User[]>`SELECT * FROM users`;

      await addListMembers(listId, [addedUser]);

      const listItem = {
        listId,
        name: 'test list item',
        price: 100,
        users: [addedUser],
      };

      await addListItem({
        listId,
        createdBy: addedUser,
        eventType: 'add',
        start: null,
        end: { ...listItem, id: 1, active: true },
      });

      let listItems = await getListItems(listId);
      await modifyListItem({
        listId,
        createdBy: addedUser,
        eventType: 'modify',
        start: listItems[0],
        end: { ...listItems[0], name: 'new name', price: 200 },
      });
      listItems = await getListItems(listId);

      expect(listItems).toHaveLength(1);
      expect(listItems[0].listId).toEqual(listItem.listId);
      expect(listItems[0].name).toEqual('new name');
      expect(listItems[0].price).toEqual(200);
      expect(listItems[0].users).toEqual([addedUser]);
    });
  });

  describe('listevents', () => {
    it('should get a shopping list events', async () => {
      const list = { name: 'testlist', location: '123 Main St.' };
      await addList(list, []);

      let results = await sql<Types.List[]>`SELECT * FROM lists`;
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

      const [addedUser1, addedUser2] = await sql<
        Types.User[]
      >`SELECT * FROM users`;

      await addListMembers(listId, [addedUser1, addedUser2]);

      const listItem1 = {
        listId,
        name: 'test list item',
        price: 100,
        users: [addedUser1],
      };

      await addListItem({
        listId,
        createdBy: addedUser2,
        eventType: 'add',
        start: null,
        end: { ...listItem1, id: 1 },
      });

      let listItems = await getListItems(listId);
      await modifyListItem({
        listId,
        createdBy: addedUser1,
        eventType: 'modify',
        start: listItems[0],
        end: { ...listItems[0], name: 'new name', price: 200 },
      });

      listItems = await getListItems(listId);
      await deleteListItem({
        listId,
        createdBy: addedUser2,
        eventType: 'delete',
        start: listItems[0],
        end: null,
      });

      const listEvents = await getListItemEvents([listId]);
      expect(listEvents).toHaveLength(3);
      expect(listEvents[0].eventType).toEqual('delete');
      expect(listEvents[1].eventType).toEqual('modify');
      expect(listEvents[2].eventType).toEqual('add');
    });
  });
});
