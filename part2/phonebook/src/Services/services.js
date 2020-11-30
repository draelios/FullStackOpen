import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';

const baseUrl = 'http://localhost:3004/persons';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
}

const createPerson = (newPerson) => {
  axios.post(baseUrl, newPerson)
}

const deletePerson = (id) => {
  alert('Do you want to delete this person?')
  axios.delete(`${baseUrl}/${id}`)
}


export default {getAll, createPerson, deletePerson};