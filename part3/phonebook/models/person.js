/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_ROUTE;

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

// we define the schema for a person
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
},
{ timestamps: true });

// we create a collection for the person schema and give it a name
const Person = mongoose.model('Person', personSchema);

// converts the id from mongo to a string an assigns it to the new object
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Person;
