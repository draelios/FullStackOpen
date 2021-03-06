const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'My first blog',
    author: 'Albert Cantero',
    url: 'google.com',
    likes: 10000,
  },
  {
    title: 'My second blog',
    author: 'Albert Cantero',
    url: 'google.com',
    likes: 1234,
  },
];

const initalUser = [
  {
    username: 'root',
    name: 'rooter underson',
    email: 'under@gmail.com',
    password: 'sekret',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() });
  await blog.save();
  await blog.remove();

  return blog.id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initalUser,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
