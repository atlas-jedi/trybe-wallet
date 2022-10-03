import React from 'react';

import logoTrybe from '../images/logoTrybe.svg';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target: { type, value } }) => {
    this.setState({ [type]: value }, () => {
      // validação dos campos
      const MAX_LENGTH_PASSWORD = 6;
      const { email, password } = this.state;

      const isValidPassword = Boolean(password.length >= MAX_LENGTH_PASSWORD);
      const isValidEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);

      this.setState({ isDisabled: !(isValidPassword && isValidEmail) });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Debugando submit de formulário');
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <div className="login center">
        <div className="background center" />
        <div className="box">
          <form onSubmit={ this.handleSubmit }>
            <img src={ logoTrybe } alt="" />
            <label htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password">
              Senha:
              <input
                id="password"
                type="password"
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>
            <button type="submit" disabled={ isDisabled }>Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
