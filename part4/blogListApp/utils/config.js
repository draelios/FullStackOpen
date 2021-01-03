/*
Contains all the configuration variables fron the .env file
If we have diffetent variable for env we can put this logic here
*/
require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
};
