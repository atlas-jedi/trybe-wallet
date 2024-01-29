import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import reducer from './reducers';
import localStorageMiddleware from './localStorageMiddleware';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk, localStorageMiddleware),
  ),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
