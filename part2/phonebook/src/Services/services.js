import axios from 'axios';

 const PROD = 'https://phonebook-fullstack-ac.herokuapp.com';
//const DEV = 'http://localhost:3001';


const getAll = () => {
  return axios.get(`${PROD}/api/persons`)
};

const createPerson = (newPerson) => {
  return axios.post(`${PROD}/api/persons`, newPerson)
};

const deleteOne = (id) => {
  return axios.delete(`${PROD}/api/persons/${id}`)
};


export default {getAll, createPerson, deleteOne};
