import axios from 'axios';

// const PROD = 'https://phonebook-fullstack-ac.herokuapp.com';
const DEV = 'http://localhost:3001';


const getAll = () => {
  return axios.get(`${DEV}/api/persons`)
};

const createPerson = (newPerson) => {
  return axios.post(`${DEV}/api/persons`, newPerson)
};

const deleteOne = (id) => {
  return axios.delete(`${DEV}/api/persons/${id}`)
};


export default {getAll, createPerson, deleteOne};
