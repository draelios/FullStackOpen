import axios from 'axios';

const baseUrl = 'https://phonebook-fullstack-ac.herokuapp.com';
const local = 'http://localhost:3001';

const getAll = () => {
  return axios.get(`${local}/api/persons`)
}

const createPerson = (newPerson) => {
  return axios.post(`${local}/api/persons`, newPerson)
}

const deletePerson = (id) => {
  alert('Do you want to delete this person?')
  return axios.delete(`${local}/api/persons/${id}`)
}


export default {getAll, createPerson, deletePerson};
