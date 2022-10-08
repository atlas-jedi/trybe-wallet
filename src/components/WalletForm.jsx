import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { fetchCurrencies } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  tag: 'Alimentação',
  method: 'Dinheiro',
  currency: 'USD',
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { loadCurrencies } = this.props;
    loadCurrencies();
  }

  handleChange = ({ target: { id, value } }) => this.setState({ [id]: value });

  handleSubmit = (event) => {
    event.preventDefault();
    // pegar todos os dados de câmbio nesse momento na api
    const { saveForm } = this.props;
    saveForm(this.state);
    this.setState(INITIAL_STATE);
  };

  render() {
    const { value, description, tag, method, currency } = this.state;
    const { currencies } = this.props;

    return (
      <form onSubmit={ this.handleSubmit } className="form-wallet">
        <label htmlFor="description" className="description">
          Descrição da despesa
          <input
            id="description"
            value={ description }
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="tag">
          Categoria da despesa
          <select
            data-testid="tag-input"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="value" className="value">
          Valor
          <input
            id="value"
            value={ value }
            type="number"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            data-testid="method-input"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((code, index) => (
              <option key={ index } value={ code }>{ code }</option>
            )) }
          </select>
        </label>
        <br />
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(fetchCurrencies('currencies')),
  saveForm: (form) => dispatch(fetchCurrencies('saveForm', form)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
