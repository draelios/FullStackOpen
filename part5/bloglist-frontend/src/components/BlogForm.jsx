/* eslint-disable react/prop-types */
import React from 'react';

const BlogForm = ({ handleSumbit, handleChange, newBlog }) => {
  const { title, author, url } = newBlog || '';
  return (
    <>
      <form onSubmit={handleSumbit}>
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
