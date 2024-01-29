const getExpenses = () => {
  const expenses = localStorage.getItem('expenses');
  return expenses ? JSON.parse(expenses) : [];
};

// const saveExpenses = (expenses) => {
//   const expStoraged = getExpenses();
//   localStorage.setItem('expenses', JSON.stringify(
//     [...expStoraged, expenses],
//   ));
// };

// export { saveExpenses, getExpenses };

export default getExpenses;
