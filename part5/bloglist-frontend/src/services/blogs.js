import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = async () => axios.get(baseUrl);

const createBlog = async (blog, token) => axios.post(baseUrl, blog, {
  headers: { Authorization: `Bearer ${token}` },
});

const likeBlog = async (id, blog, token) => axios.put(`${baseUrl}/${id}/like`, blog, {
  headers: { Authorization: `Bearer ${token}` },
});

const updateBlog = async (id, blog, token) => axios.put(`${baseUrl}/${id}`, blog, {
  headers: { Authorization: `Bearer ${token}` },
});

const deleteBlog = async (id, token) => axios.delete(`${baseUrl}/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

export default {
  getAll, createBlog, likeBlog, updateBlog, deleteBlog,
};
