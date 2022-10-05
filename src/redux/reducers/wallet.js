import { GET_CURRENCIES } from '../actions';

const INITAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: return {
    ...state,
    currencies: action.currencies,
  };
  default: return state;
  }
};

export default wallet;
