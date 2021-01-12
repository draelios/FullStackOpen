/* eslint-disable consistent-return */
/*
Contains all the routs regarding the blogs. The routes are relative to the path attached
in the app.js file to the router.
*/
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('userId', { name: 1, username: 1 });
    response.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const { userId, ...blogInfo } = request.body;
  const user = await User.findById(userId);
  const newBlog = new Blog({ ...blogInfo, userId: user.id });

  try {
    const blog = await newBlog.save();
    console.log(user);
    user.blogs = user.blogs.concat(blog.id);
    await user.save();
    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);
    response.status(204).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const updatedProperties = request.body;
  try {
    const blog = await Blog.updateOne({ _id: id }, updatedProperties);
    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
