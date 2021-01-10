/*
Contains all the routs regarding the blogs. The routes are relative to the path attached
in the app.js file to the router.
*/
const blogsRouter = require('express').Router();
const logger = require('../utils/logger.js');
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    return response.json(blogs);
  } catch (error) {
    logger.error(error);
  }
});

blogsRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body);
  try {
    const blog = await newBlog.save();
    return response.status(201).json(blog);
  } catch (error) {
    logger.error(error);
  }
});

module.exports = blogsRouter;
