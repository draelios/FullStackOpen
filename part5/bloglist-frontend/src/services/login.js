import axios from 'axios';

const baseUrl = 'http://localhost:3001/login';

const userLogin = async (user) => axios.post(baseUrl, user);

export default { userLogin };
