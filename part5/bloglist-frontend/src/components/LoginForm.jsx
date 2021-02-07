/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const LoginForm = ({ login }) => {
  const [loginInfo, setLoginInfo] = useState({});

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      username: loginInfo.username,
      password: loginInfo.password,
    };
    login(userInfo);
    setLoginInfo({
      username: '',
      password: '',
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <b>Username: </b>
          <input
            type="text"
            name="username"
            value={loginInfo.username || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="password">
          <b>Password: </b>
          <input
            type="password"
            name="password"
            value={loginInfo.password || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit"> Login </button>
      </form>
    </>
  );
};

export default LoginForm;
