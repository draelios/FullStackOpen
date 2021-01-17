/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const express = require('express');
const config = require('../utils/config');
const { passwordValidator } = require('../utils/middleware');
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

userRouter.get('/:id', async (request, response, next) => {
  try {
    const users = await User.findById(request.params.id).populate('blogs', {
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

userRouter.post('/', passwordValidator, async (request, response, next) => {
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

userRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    response.status(204).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const updatedProperties = request.body;
  try {
    const user = await User.updateOne({ _id: id }, updatedProperties);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
