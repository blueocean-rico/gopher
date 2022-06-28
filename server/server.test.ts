import postgres from 'postgres';
import { addUser } from '@/server/users/index';
import { insertUser } from '@/server/users/users.dal';
//import {} from '@/server/lists/index';


const sql = postgres('postgres://postgres:postgres@localhost:5433/gopher');

describe('server', () => {
  describe('users', () => {
    it('should create a user', async () => {

      const user = {
        nickname: 'test',
        email: 'test@email.com',
        picture: 'https://picture.com',
      };

      addUser(user);

      const result = await sql`SELECT * FROM users`;
      console.log(result);

      const {nickname, email, picture} = result[0];
      expect(nickname).toEqual(user.nickname);
      expect(email).toEqual(user.email);
      expect(picture).toEqual(user.picture);

      sql`DELETE FROM users`;
    });
  });

  describe('lists', () => {
  });

  describe('listmembers', () => {
  });

  describe('listitems', () => {
  });

  describe('listevents', () => {
  });
});
