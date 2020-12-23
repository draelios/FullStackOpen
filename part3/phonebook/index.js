const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
require('dotenv').config();

const app = express();

// eslint-disable-next-line no-unused-vars
morgan.token('post', (req, res) => {
  if (req.method === 'POST') {
    const json = JSON.stringify(req.body);
    return json;
  }
  return ' ';
});

function errorHandler(err, req, res, next) {
  res.status(500).send();
}

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));
app.use(errorHandler);

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`
    <h2>Phonebook has info for ${Person.find({}).length} people. <h2>
    <h2> ${date.toString()} <h2>`);
});

// eslint-disable-next-line arrow-body-style
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    res.status(422).send('Error: Name and number must be informed');
  } else if (Person.findOne({ name: req.params.name })) {
    Person.findOneAndUpdate(
      { name: req.body.name },
      { number: req.body.number },
    )
      .catch((error) => next(error));
  } else {
    const person = {
      name: req.body.name,
      number: req.body.number,
    };
    Person.create(person)
      .catch((error) => next(error));
  }
  res.redirect(302, '/api/persons');
});

app.put('/api/persons/update', (req, res, next) => {
  Person.findOneAndUpdate(
    { name: req.body.name },
    { number: req.body.number },
  )
    // eslint-disable-next-line no-unused-vars
    .then((person) => {
      res.redirect(302, '/api/persons');
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.deleteOne({ _id: id })
    .then((person) => {
      if (person.n === 1) {
        res.redirect(302, '/api/persons');
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
