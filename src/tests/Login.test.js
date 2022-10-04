import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Teste da página de login', () => {
  const CORRECT_EMAIL = 'email.valid@gmail.com';
  const CORRECT_PASSWORD = 'validPassword';
  const INCORRECT_EMAIL = 'com.valid@email-gmail';
  const INCORRECT_PASSWORD = 'pass';

  test('Testa a validação da página de login', () => {
    renderWithRouterAndRedux(<App />, '/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button');

    userEvent.type(emailInput, INCORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    expect(loginButton).toHaveProperty('disabled', true);

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, INCORRECT_PASSWORD);
    expect(loginButton).toHaveProperty('disabled', true);

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    expect(loginButton).toHaveProperty('disabled', false);
    userEvent.click(loginButton);
  });
});
