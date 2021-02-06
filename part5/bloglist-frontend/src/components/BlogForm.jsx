import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleSumbit }) => {
  const [newBlog, setNewBlog] = useState({});

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const createBlog = (event) => {
    event.preventDefault();
    const blogInfo = {
      author: newBlog.author,
      title: newBlog.title,
      url: newBlog.url,
    };
    handleSumbit(blogInfo);
    setNewBlog({
      author: '',
      title: '',
      url: '',
    });
  };

  return (
    <>
      <form onSubmit={createBlog}>
        <label htmlFor="title">
          <b>Title: </b>
          <input
            type="text"
            id="title"
            name="title"
            value={newBlog.title || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="author">
          <b>Author: </b>
          <input
            type="text"
            id="author"
            name="author"
            value={newBlog.author || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="url">
          <b>URL: </b>
          <input
            type="text"
            id="url"
            name="url"
            value={newBlog.url || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  handleSumbit: PropTypes.func.isRequired,
};

export default BlogForm;
