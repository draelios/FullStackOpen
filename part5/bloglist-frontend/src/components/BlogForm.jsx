/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const BlogForm = ({ handleSumbit }) => {
  const [newBlog, setNewBlog] = useState({});
  const { title, author, url } = newBlog || '';

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setNewBlog({
      [name]: value,
    });
  };

  const createBlog = (event) => {
    event.preventDefault();
    const blogInfo = {
      author: event.target.author.value,
      title: event.target.title.value,
      url: event.target.url.value,
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
            name="title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="author">
          <b>Author: </b>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="url">
          <b>URL: </b>
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit"> Create </button>
      </form>
    </>
  );
};

export default BlogForm;
