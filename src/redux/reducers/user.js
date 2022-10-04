import { SAVE_EMAIL } from '../actions';

const INITAL_STATE = {
  email: '',
};

const user = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL: return {
    ...state,
    email: action.email,
  };
  default: return state;
  }
};

export default user;
