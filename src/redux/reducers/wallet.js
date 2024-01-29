import getExpenses from '../../services/localStorage';
import {
  GET_CURRENCIES,
  SAVE_EDIT_FORM,
  SAVE_EDIT_EXPENSE,
  CALC_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const INITAL_STATE = {
  currencies: [],
  expenses: getExpenses(),
  editor: false,
  totalExpense: '0',
  idToEdit: 0,
};

const wallet = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: return {
    ...state,
    currencies: action.currencies,
  };
  case SAVE_EDIT_FORM: return {
    ...state,
    editor: false,
    expenses: [...state.expenses, {
      id: state.expenses.length,
      ...action.form,
    }],
  };
  case SAVE_EDIT_EXPENSE: return {
    ...state,
    editor: false,
    expenses: state.expenses.map((expense) => {
      if (expense.id === state.idToEdit) {
        return {
          ...expense,
          ...action.form,
        };
      }
      return expense;
    }),
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: state.expenses.filter(({ id }) => id !== Number(action.id)),
  };
  case CALC_EXPENSE: return {
    ...state,
    totalExpense: Number(state.expenses.reduce((acc, exp) => {
      const currentExpenseCode = exp.currency;
      const currentValue = Number(exp.value);

      const { ask } = Object.values(exp.exchangeRates)
        .filter(({ codein }) => codein !== 'BRLT')
        .find(({ code }) => code === currentExpenseCode);

      return (currentValue * Number(ask)) + acc;
    }, 0)).toFixed(2),
  };
  case EDIT_EXPENSE: return {
    ...state,
    idToEdit: action.id,
    editor: true,
  };
  default: return state;
  }
};

export default wallet;
