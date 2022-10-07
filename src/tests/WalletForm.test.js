import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

import mockData from './helpers/mockData';

describe('Testes do formulário de carteira', () => {
  afterEach(() => { jest.clearAllMocks(); });
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
          expenses: [],
          totalExpense: '0',
        },
      };

      renderWithRouterAndRedux(<App />, { initialState: store, initialEntries: ['/carteira'] });
    });

    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
    expect(currencyInput.value).toBe('USD');
    expect(currencyInput.childNodes.length).toBe(15);
  });

  test('Teste do comportamento do formulário ao preencher', () => {

  });
});
