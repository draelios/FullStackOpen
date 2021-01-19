const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

describe('Blog functionality testing', () => {
  let token = '';
  const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBwcHBwcHBwcHBwcHBwcHBwcHBwcHAiLCJpZCI6IjYwMDFhODc5NjM5YTgwNDJlZTBiMjMwMiIsImlhdCI6MTYxMTAwMjY1Nn0.FlDItB4vszMpMetxacct6UPl5uyCDjouCwxcr1eSefk';
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const newUser = new User({
      username: 'root',
      name: 'rooter underson',
      email: 'under@gmail.com',
      passwordHash,
    });

    const user = await newUser.save();

    const petition = await api
      .post('/login')
      .send({ username: 'root', password: 'sekret' });

    token = petition.body.token;

    await Blog.deleteMany({});

    const noteObjects = helper.initialBlogs.map((blog) => new Blog({ ...blog, userId: user.id }));
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

  describe('inserting a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'How to create blogs',
        author: 'Albert Cantero',
        url: 'google.com',
        likes: 10000,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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
      const initialBlogs = await helper.blogsInDb();
      const newBlog = {
        author: 'Albert Cantero',
        url: 'google.com',
        likes: 10000,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(initialBlogs.length);
    }, 10000);

    test('blog without title and url is not added', async () => {
      const initialBlogs = await helper.blogsInDb();
      const newBlog = {
        author: 'Albert Cantero',
        likes: 10000,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(initialBlogs.length);
    }, 10000);

    test('blog without likes has a value of 0 likes', async () => {
      const initialBlogs = await helper.blogsInDb();
      const newBlog = {
        title: 'How to create blogs',
        author: 'Albert Cantero',
        url: 'google.com',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

      expect(blogsAtEnd[initialBlogs.length]).toMatchObject({ likes: 0 });
    }, 10000);
  });

  describe('deleting a blog from the DB', () => {
    test('you can delete a blog if you are the correct user', async () => {
      const intitialBlogs = await helper.blogsInDb();
      const { id } = intitialBlogs[0];
      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(intitialBlogs.length - 1);
      expect(blogsAtEnd).not.toMatchObject({ id });
    });

    test('you can\'t delete a blog if you are not it\'s ', async () => {
      const intitialBlogs = await helper.blogsInDb();
      const { id } = intitialBlogs[0];
      const result = await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${badToken}`)
        .expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(intitialBlogs.length);
      expect(result.body.error).toContain('Permission denied. You do not own this blog.');
    });
  });

  describe('updating a blog from the DB is done correctly if you are the user', () => {
    test('updating a blog with the correct id', async () => {
      const intitialBlogs = await helper.blogsInDb();
      const { id } = intitialBlogs[0];
      const newData = { title: 'Updated title' };

      await api
        .put(`/api/blogs/${id}`)
        .send(newData)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd.find((blog) => blog.id === id);

      expect(blogsAtEnd).toHaveLength(intitialBlogs.length);
      expect(updatedBlog).toMatchObject(newData);
    });

    test('updating a blog with the correct id', async () => {
      const intitialBlogs = await helper.blogsInDb();
      const { id } = intitialBlogs[0];
      const newData = { title: 'Updated title' };

      await api
        .put(`/api/blogs/${id}`)
        .send(newData)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd.find((blog) => blog.id === id);

      expect(blogsAtEnd).toHaveLength(intitialBlogs.length);
      expect(updatedBlog).toMatchObject(newData);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
