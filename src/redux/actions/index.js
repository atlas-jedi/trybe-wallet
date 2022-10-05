import fetchApi from '../../services/fetchApi';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  fetchApi().then((data) => {
    const currencies = Object.values(data).filter(({ codein }) => codein !== 'BRLT')
      .map(({ code }) => code);
    dispatch(getCurrencies(currencies));
  });
};
