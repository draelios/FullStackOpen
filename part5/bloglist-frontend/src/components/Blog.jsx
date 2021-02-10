/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
      <button style={hideWhenVisible} type="button" onClick={toggleVisibility}>Show info</button>
      <button style={showWhenVisible} type="button" onClick={toggleVisibility}>Hide info</button>
      <div className="details" style={showWhenVisible}>
        <p>
          URL:
          {'  '}
          {url}
        </p>
        <div className="likes">
          likes:
          {likes}
          <button type="button" onClick={handleLike}>Like</button>
        </div>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object.isRequired,
  editBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
