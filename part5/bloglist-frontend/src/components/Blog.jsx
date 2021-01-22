/* eslint-disable react/prop-types */
import React from 'react';

const Blog = ({ blog }) => {
  const { title, author } = blog;

  return (
    <div>
      {title}
      {' '}
      {author}
    </div>
  );
};

export default Blog;
