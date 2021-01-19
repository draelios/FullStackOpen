/* eslint-disable consistent-return */
/*
Contains all the routs regarding the blogs. The routes are relative to the path attached
in the app.js file to the router.
*/
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
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

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('userId', { name: 1, username: 1 });
    response.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const { ...blogInfo } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({ ...blogInfo, userId: decodedToken.id });

  try {
    const blog = await newBlog.save();
    user.blogs = user.blogs.concat(blog.id);
    await user.save();
    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete.userId.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'Permission denied. You do not own this blog.' });
  }

  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);
    response.status(204).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const blogToDelete = await Blog.findById(request.params.id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (blogToDelete.userId.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'Permission denied. You do not own this blog.' });
  }

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
