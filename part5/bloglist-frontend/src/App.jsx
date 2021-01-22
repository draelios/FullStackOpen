import React, { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import User from './components/User';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({});
  const [newBlog, setNewBlog] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogList) => setBlogs(blogList));
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

  const handleBlogChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setNewBlog({
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const userCred = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    const userInfo = await loginService.userLogin(userCred);
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify(userInfo.data),
    );
    setUser(userInfo.data);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const blogInfo = {
      author: event.target.author.value,
      title: event.target.title.value,
      url: event.target.url.value,
    };
    const create = await blogService.createBlog(blogInfo, user.token);
    if (create.status === 201) {
      setNewBlog({
        author: '',
        title: '',
        url: '',
      });
      blogService.getAll().then((blogList) => setBlogs(blogList));
    }
  };

  return (
    <div>
      {
        user
          ? (
            <>
              <User user={user} logOut={handleLogout} />
              <BlogForm
                handleSumbit={handleCreate}
                handleChange={handleBlogChange}
                newBlog={newBlog}
              />
              <BlogList blogs={blogs} />
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
