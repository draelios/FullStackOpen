/*
Contains all the routs regarding the blogs. The routes are relative to the path attached
in the app.js file to the router.
*/
const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

module.exports = blogsRouter;
