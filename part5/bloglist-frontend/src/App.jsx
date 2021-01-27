import React, { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import User from './components/User';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(async () => {
    const blogList = await blogService.getAll();
    setBlogs(blogList.data);
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON);
      setUser(userInfo);
    }
  }, []);

  const handleLoginChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setLogin({
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const userCred = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    try {
      const userInfo = await loginService.userLogin(userCred);
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(userInfo.data),
      );
      setUser(userInfo.data);
    } catch (error) {
      setNotification({
        message: `${error.response.data.error}`,
        type: 'error',
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  const handleCreate = async (blogInfo) => {
    try {
      const create = await blogService.createBlog(blogInfo, user.token);

      const blogList = await blogService.getAll();
      setBlogs(blogList.data);
      setNotification({
        message: `${create.data.title} was created correctly.`,
        type: 'success',
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({
        message: `${error.response.data.error}`,
        type: 'error',
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleUpdate = async (id, blogInfo, like = false) => {
    try {
      if (like) {
        await blogService.likeBlog(id, blogInfo, user.token);
      } else {
        await blogService.updateBlog(id, blogInfo, user.token);
      }
      const blogList = await blogService.getAll();
      setBlogs(blogList.data);
    } catch (error) {
      setNotification({
        message: `${error.response.data.error}`,
        type: 'error',
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleDelete = async (blog) => {
    const message = `Do you want to delete ${blog.title} by ${blog.author}? This action cannot be undone.`;
    try {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) {
        await blogService.deleteBlog(blog.id, user.token);
        const blogList = await blogService.getAll();
        setBlogs(blogList.data);
        setNotification({
          message: `${blog.title} was deleted correctly.`,
          type: 'success',
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } catch (error) {
      setNotification({
        message: `${error.response.data.error}`,
        type: 'error',
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      {
        user
          ? (
            <>
              <User user={user} logOut={handleLogout} />
              <Togglable buttonLabel="Create blog">
                <BlogForm handleSumbit={handleCreate} />
              </Togglable>
              <BlogList
                blogs={blogs}
                editBlog={handleUpdate}
                deleteBlog={handleDelete}
              />
            </>
          )
          : (
            <LoginForm
              handleSumbit={handleLogin}
              handleChange={handleLoginChange}
              login={login}
            />
          )

      }
    </div>
  );
};

export default App;
