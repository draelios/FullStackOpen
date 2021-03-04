const initialState = "";

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTER': {
      const newState = action.filter;
      return newState;
    }

    default: return state;
  }
}

export const changeFilter = (filter) => {
  return {
    type: 'FILTER',
    filter,
  }
}



export default filterReducer