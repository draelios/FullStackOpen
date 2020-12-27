const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
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
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));
app.use(errorHandler);

app.get('/', (req, res) => {
  res.sendFile('./build/static/js/main.76764cce.chunk.js');
});

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`
    <h2>Phonebook has info for ${Person.find({}).length} people. <h2>
    <h2> ${date.toString()} <h2>`);
});

// eslint-disable-next-line arrow-body-style
app.get('/api/persons', (req, res, next) => {
  return Person.find({})
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
  } else {
    Person.find({ name: req.body.name }, (err, person) => {
      if (person.length > 0) {
        Person.findOneAndUpdate(
          { name: req.body.name },
          { number: req.body.number },
        )
          .then((result) => {
            console.log(result);
            res.redirect(`/api/persons/${result.id}`);
          })
          .catch((error) => next(error));
      } else {
        // eslint-disable-next-line no-shadow
        const person = {
          name: req.body.name,
          number: req.body.number,
        };
        Person.create(person)
          .then((result) => {
            console.log(result);
            res.redirect(`/api/persons/${result.id}`);
          })
          .catch((error) => next(error));
      }
    });
  }
});

app.put('/api/persons/update', (req, res, next) => {
  Person.findOneAndUpdate(
    { name: req.body.name },
    { number: req.body.number },
  )
    // eslint-disable-next-line no-unused-vars
    .then((person) => {
      res.status(200).send();
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.deleteOne({ _id: id })
    .then((person) => {
      res.status(200).send();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
