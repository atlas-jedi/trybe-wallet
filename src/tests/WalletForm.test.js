import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

import mockData from './helpers/mockData';

describe('', () => {
  test('', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      const response = await fetch().then((data) => data.json());
      const currencies = Object.values(response)
        .filter(({ codein }) => codein !== 'BRLT').map(({ code }) => code);

      const store = {
        wallet: {
          currencies,
        },
      };

      renderWithRouterAndRedux(<App />, { initialState: store, initialEntries: ['/carteira'] });
    });

    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
    expect(currencyInput.value).toBe('USD');
    expect(currencyInput.childNodes.length).toBe(15);

    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));

    const currencies = await fetch().catch((err) => err);

    expect(currencies).toEqual(Error('API is down'));
  });
});
