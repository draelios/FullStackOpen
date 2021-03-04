
const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE': {
      const newState = `You have created '${action.data.message}'`;
      return newState;
    }
    case 'LIKE': {
      const newState = `You have liked '${action.data.message}'`;
      return newState;
    }
    case 'DELETE': {
      return initialState;
    }
    default: 
      return state;
  }
}

export const createNotification = (message) => {
  setInterval(deleteNotification, 5000);
  return {
    type: 'CREATE',
    data: {
      message,
    }
  }
}

export const likeNotification = (message) => {
  setInterval(deleteNotification, 5000);
  return {
    type: 'LIKE',
    data: {
      message,
    }
  }
}

export const deleteNotification = (message) => {
  return {
    type: 'DELETE',
  }
}


export default notificationReducer