/* eslint-disable react/prop-types */
import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, editBlog, deleteBlog }) => {
  const sortedList = blogs.sort((a, b) => b.likes - a.likes);
  return (
    <div>
      <h2>blogs</h2>
      {sortedList.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          editBlog={editBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;
