import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

import logoTrybe from '../images/logoTrybe.svg';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
    redirect: false,
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

    const { dispatchEmail } = this.props;
    const { email } = this.state;

    dispatchEmail(email);

    this.setState({ redirect: true });
  };

  render() {
    const { isDisabled, redirect } = this.state;

    if (redirect) return (<Redirect to="/carteira" />);

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

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
