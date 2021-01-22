import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createBlog = async (blog) => {
  const request = await axios.post(baseUrl, blog);
  return request.data;
};

export default { getAll, createBlog };
