import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import logoTrybe from '../images/logoTrybe.svg';

class Header extends Component {
  render() {
    const { email, totalExpense } = this.props;

    return (
      <header>
        <img src={ logoTrybe } alt="Logo Trybewallet" />
        <div className="total-expense">
          <p>
            {'Total de despesas: '}
            <span data-testid="total-field">
              { totalExpense }
            </span>
            <span data-testid="header-currency-field"> BRL</span>
          </p>
        </div>
        <div>
          <p data-testid="email-field">{ email }</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.wallet.totalExpense,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
