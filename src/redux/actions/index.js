import fetchApi from '../../services/fetchApi';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EDIT_FORM = 'SAVE_EDIT_FORM';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';
export const CALC_EXPENSE = 'CALC_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

const saveEditForm = (form) => ({
  type: SAVE_EDIT_FORM,
  form,
});

const saveEditExpense = (form) => ({
  type: SAVE_EDIT_EXPENSE,
  form,
});

const calcTotalExpense = () => ({ type: CALC_EXPENSE });

export const deleteExpense = (id) => (dispatch) => {
  dispatch({
    type: DELETE_EXPENSE,
    id,
  });
  dispatch(calcTotalExpense());
};

export const editExpense = (id) => ({ type: EDIT_EXPENSE, id });

export const fetchCurrencies = (type, form = undefined) => (dispatch) => {
  fetchApi().then((data) => {
    const currencies = Object.values(data).filter(({ codein }) => codein !== 'BRLT');
    const currenciesCode = currencies.map(({ code }) => code);

    if (type === 'currencies') {
      dispatch(getCurrencies(currenciesCode));
    } else if (type === 'saveForm') {
      form = {
        ...form,
        exchangeRates: data,
      };
      dispatch(saveEditForm(form));
    } else if (type === 'saveExpense') {
      form = {
        ...form,
        exchangeRates: data,
      };
      dispatch(saveEditExpense(form));
    }

    dispatch(calcTotalExpense());
  });
};
