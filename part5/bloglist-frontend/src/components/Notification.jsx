/* eslint-disable react/prop-types */
import React from 'react';
import '../App.css';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const { message, type } = notification;
  return (
    <div className={(type === 'success' ? 'success' : 'error')}>
      {message}
    </div>
  );
};

export default Notification;
