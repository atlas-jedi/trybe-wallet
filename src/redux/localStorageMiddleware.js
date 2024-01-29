const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === 'SAVE_EDIT_FORM' || action.type === 'DELETE_EXPENSE') {
    const { expenses } = store.getState().wallet;
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  return result;
};

export default localStorageMiddleware;
