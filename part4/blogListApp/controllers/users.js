const bcrypt = require('bcrypt');
const express = require('express');
const config = require('../utils/config');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      select: 'name -id',
    });
    return response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (request, response, next) => {
  const userInfo = request.body;
  const passwordHash = await bcrypt.hash(userInfo.password, Number(config.SALT_ROUNDS));

  const newUser = new User({
    username: userInfo.username,
    name: userInfo.name,
    email: userInfo.email,
    passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    return response.status(201).send(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
