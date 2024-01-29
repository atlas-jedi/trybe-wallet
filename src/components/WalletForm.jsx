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

  componentDidUpdate(prevProps) {
    const { editor, expenses, idToEdit } = this.props;
    if (editor && prevProps.editor !== editor) {
      const expenseToEdit = expenses.find(({ id }) => id === idToEdit);
      this.setState(expenseToEdit);
    }
  }

  // handleChange = ({ target: { id, value } }) => this.setState({ [id]: value });
  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { saveForm, saveExpense, editor } = this.props;

    if (editor) {
      saveExpense(this.state);
    } else {
      saveForm(this.state);
    }

    this.setState(INITIAL_STATE);
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, tag, currency, method } = this.state;

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
        <button type="submit">{ editor ? 'Editar despesa' : 'Adicionar despesa' }</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: Number(state.wallet.idToEdit),
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(fetchCurrencies('currencies')),
  saveForm: (form) => dispatch(fetchCurrencies('saveForm', form)),
  saveExpense: (form) => dispatch(fetchCurrencies('saveExpense', form)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
