const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.json);

const persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/info', (req, res) => {
  res.json(`
  <h2> Phonebook has info for ${persons.length} people. </h2>
  <h2>${Date.now()}</h2>
  `);
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});