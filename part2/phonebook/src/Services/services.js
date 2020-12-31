import axios from 'axios';

 const PROD = 'https://phonebook-fullstack-ac.herokuapp.com';
 const DEV = 'http://localhost:3001';
 const url = process.env.NODE_ENV === 'production' ? PROD : DEV 


const getAll = () => {
  return axios.get(`${url}/api/persons`)
};

const createPerson = (newPerson) => {
  return axios.post(`${url}/api/persons`, newPerson)
};

const deleteOne = (id) => {
  return axios.delete(`${url}/api/persons/${id}`)
};


export default {getAll, createPerson, deleteOne};
