const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../models/user');

const loginRouter = express.Router();

// eslint-disable-next-line consistent-return
loginRouter.post('/', async (request, response, next) => {
  const { body } = request;
  try {
    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
