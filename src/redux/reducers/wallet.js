import { GET_CURRENCIES, SAVE_EDIT_FORM, CALC_EXPENSE } from '../actions';

const INITAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  totalExpense: '0',
  idToEdit: 0,
};

const wallet = (state = INITAL_STATE, action) => {
  const EXP_LENGTH = state.expenses.length;

  switch (action.type) {
  case GET_CURRENCIES: return {
    ...state,
    currencies: action.currencies,
  };
  case SAVE_EDIT_FORM: return {
    ...state,
    expenses: [...state.expenses, {
      id: EXP_LENGTH > 0 ? state.expenses[EXP_LENGTH - 1].id + 1 : 0,
      ...action.form,
    }],
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
  default: return state;
  }
};

export default wallet;
