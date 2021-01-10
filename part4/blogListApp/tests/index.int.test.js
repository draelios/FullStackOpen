const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 10000); // this changes de default timeout of 5000ms

afterAll(() => {
  mongoose.connection.close();
});

test('there is only one blog', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(1);
}, 10000);

test('the first blog is about my first blog', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].title).toBe('My first blog');
}, 10000);
