const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

describe('User functionality testing', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'root',
      name: 'rooter underson',
      email: 'under@gmail.com',
      passwordHash,
    });

    await user.save();
  });

  describe('when there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        email: 'matti@gmail.com',
        password: 'salainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('`username` to be unique');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('user can login correctly', async () => {
      const user = { username: 'root', password: 'sekret' };

      const result = await api
        .post('/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(result.body).toEqual(expect.objectContaining({ token: expect.any(String) }));
    });

    test('non-existing user can\'t login', async () => {
      const newUser = {
        username: 'new',
        password: 'new',
      };

      const result = await api
        .post('/login')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('invalid username or password');
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
