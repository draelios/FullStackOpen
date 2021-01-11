/* eslint-disable consistent-return */
/*
Contains all the routs regarding the blogs. The routes are relative to the path attached
in the app.js file to the router.
*/
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    return response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const newBlog = new Blog(request.body);
  try {
    const blog = await newBlog.save();
    return response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const updatedProperties = request.body;
  try {
    const blog = await Blog.updateOne({ _id: id }, updatedProperties);
    return response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
