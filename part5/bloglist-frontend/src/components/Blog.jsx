/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import '../App.css';

const Blog = ({ blog, editBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const {
    title, author, url, likes,
  } = blog;
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (event) => {
    event.preventDefault();
    const blogInfo = {
      likes: blog.likes + 1,
    };
    editBlog(blog.id, blogInfo, true);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteBlog(blog);
  };

  return (
    <div className="blog">
      {title}
      {' by '}
      {author}
      {'  '}
      <button style={hideWhenVisible} type="button" onClick={toggleVisibility}> Show info</button>
      <button style={showWhenVisible} type="button" onClick={toggleVisibility}> Hide info</button>
      <div style={showWhenVisible}>
        <p>
          URL:
          {'  '}
          {url}
        </p>
        <div>
          likes:
          {likes}
          <button type="button" onClick={handleLike}>Like</button>
        </div>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
