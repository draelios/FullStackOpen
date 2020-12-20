const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(mongoose());

morgan.token('post', (req, res) => {
  if (req.method === 'POST') {
    const json = JSON.stringify(req.body);
    return json;
  }
  return ' ';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`
    <h2>Phonebook has info for ${persons.length} people. <h2>
    <h2> ${date.toString()} <h2>`);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter((pers) => pers.id === id);
  if (person.length > 0) {
    res.json(person);
  } else {
    res.status(404).send();
  }
});

app.post('/api/persons', (req, res) => {
  const id = persons.length + 1;
  if (!req.body.name || !req.body.number) {
    res.status(422).send('Error: Name and number must be informed');
  } else if (persons.find((person) => person.name === req.body.name)) {
    res.status(409).send(`Username ${req.body.name} already exists.`);
  } else {
    persons.push({
      name: req.body.name,
      number: req.body.number,
      id,
    });

    res.json(persons);
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((pers) => pers.id === id);
  if (person) {
    persons = persons.filter((pers) => pers.id !== id);
    res.status(204).json(persons);
  } else {
    res.status(404).send();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
  console.log(process.env.patata);
});
