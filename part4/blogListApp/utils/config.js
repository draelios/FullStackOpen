/*
Contains all the configuration variables fron the .env file
If we have diffetent variable for env we can put this logic here
*/
require('dotenv').config();

const { PORT } = process.env;
let { MONGODB_URI } = process.env;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
