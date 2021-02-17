const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD': {
      const { good } = state;
      const newState = {
        ...state,
        good: good + 1,
      };
      return newState;
    }

    case 'OK': {
      const { ok } = state;
      const newState = {
        ...state,
        ok: ok + 1,
      };
      return newState;
    }
    case 'BAD': {
      const { bad } = state;
      const newState = {
        ...state,
        bad: bad + 1,
      };
      return newState;
    }
    case 'ZERO':
      return initialState;
    default: return state;
  }
};

export default counterReducer;
