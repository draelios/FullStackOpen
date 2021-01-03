/*
Contains logs information. It is simple but can be used to extent it with
other libraries later on
*/
/* eslint-disable no-console */
const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = { info, error };
