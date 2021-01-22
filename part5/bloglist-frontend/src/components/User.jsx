/* eslint-disable react/prop-types */
import React from 'react';

const User = ({ user, logOut }) => (
  <>
    <h3>
      {user.name}
      {' '}
      is logged in
    </h3>
    <button type="button" onClick={logOut}> Log Out</button>
  </>
);

export default User;
