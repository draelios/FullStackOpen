const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const noteObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = noteObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('There are already blogs in the DB', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000); // this changes de default timeout of 5000ms

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  test('all blogs contain and id', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((blog) => blog.title);

    expect(titles).toContain('My first blog');
  });
});

describe('inserting a new block', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'How to create blogs',
      author: 'Albert Cantero',
      url: 'google.com',
      likes: 10000,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    expect(blogsAtEnd[helper.initialBlogs.length]).toMatchObject(newBlog);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('How to create blogs');
  });

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Albert Cantero',
      url: 'google.com',
      likes: 10000,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Albert Cantero',
      likes: 10000,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  test('blog without likes has a value of 0 likes', async () => {
    const newBlog = {
      title: 'How to create blogs',
      author: 'Albert Cantero',
      url: 'google.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    expect(blogsAtEnd[helper.initialBlogs.length]).toMatchObject({ likes: 0 });
  }, 10000);
});

describe('deleting a blog from the DB', () => {
  test('deleting a blog with the correct id', async () => {
    const blogs = await helper.blogsInDb();
    const { id } = blogs[0];
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    expect(blogsAtEnd).not.toMatchObject({ id });
  });

  test('an incorrect id does not delete any blogs', async () => {
    const incorrectID = '1237826asav23123';
    const beforeBlogs = await helper.blogsInDb();
    await api
      .delete(`/api/blogs/${incorrectID}`)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toEqual(beforeBlogs);
  });
});

describe('updating a blog from the DB', () => {
  test('updating a blog with the correct id', async () => {
    const blogs = await helper.blogsInDb();
    const { id } = blogs[0];
    const newData = { title: 'Updated title' };

    await api
      .put(`/api/blogs/${id}`)
      .send(newData)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === id);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    expect(updatedBlog).toMatchObject(newData);
  });

  test('an incorrect id does not update any blogs', async () => {
    const incorrectID = '1237826asav23123';
    const beforeBlogs = await helper.blogsInDb();

    await api
      .put(`/api/blogs/${incorrectID}`)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toEqual(beforeBlogs);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
