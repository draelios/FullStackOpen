/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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
  name: {
    type: String,
    required: [true, 'A name is required to create a contact'],
    unique: [true, 'This contact already exists'],
    minlength: [3, 'The name has to be at least three characters long.'],
  },
  number: {
    type: Number,
    required: [true, 'A number is required to create a contact'],
    validate: {
      validator: (v) => /^[0-9]{8,}$/.test(v),
      message: 'The number needs to be atleast 8 digits long.',
    },
  },
},
{ timestamps: true });
personSchema.plugin(uniqueValidator);

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
