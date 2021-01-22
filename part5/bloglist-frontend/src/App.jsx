import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogList) => setBlogs(blogList));
  }, []);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    console.log(name, ' -> ', value);
    setLogin({
      [name]: value,
    });
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    console.log('im in submit!');
    setUser({ name: 'patata' });
  };

  return (
    <div>
      {
        user
          ? (
            <>
              <h3>
                {user.name}
                {' '}
                is logged in
              </h3>
              <BlogList blogs={blogs} />
            </>
          )
          : (
            <LoginForm
              handleSumbit={handleSumbit}
              handleChange={handleChange}
              login={login}
            />
          )

      }
    </div>
  );
};

export default App;
