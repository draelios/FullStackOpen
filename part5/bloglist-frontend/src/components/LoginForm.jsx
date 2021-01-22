/* eslint-disable react/prop-types */
import React from 'react';

const LoginForm = ({ handleSumbit, handleChange, login }) => (
  <>
    <form onSubmit={handleSumbit}>
      <label htmlFor="username">
        <b>Username: </b>
        <input
          type="text"
          name="username"
          value={login.username}
          onChange={handleChange}
        />
      </label>
      <br/>
      <label htmlFor="password">
        <b>Username: </b>
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
        />
      </label>
      <br/>
      <button type="submit"> Login </button>
    </form>
  </>
);

export default LoginForm;
