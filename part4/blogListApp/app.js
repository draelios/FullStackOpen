/*
Contains the main body of the app
Imports the requirements and connects the middlewares and controllers
*/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');

// Creating the app
const app = express();

// Controllers and middlewares imports
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to DB...');

// DB connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

/*
Middlewares and controllers connections
The order of connection is the other that will be used by express
*/
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
