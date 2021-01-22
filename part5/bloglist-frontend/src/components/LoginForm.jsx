/* eslint-disable react/prop-types */
import React from 'react';

const LoginForm = ({ handleSumbit, handleChange, login }) => {
  const { username, password } = login;
  return (
    <>
      <form onSubmit={handleSumbit}>
        <label htmlFor="username">
          <b>Username: </b>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="password">
          <b>Password: </b>
          <input
            type="password"
            name="password"
            value={password}
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
