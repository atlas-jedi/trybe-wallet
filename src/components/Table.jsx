import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';

import lixeira from '../images/lixeira.svg';
import edit from '../images/edit.svg';

class Table extends Component {
  render() {
    const { expenses, deleteExp, editExp } = this.props;

    return (
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((exp) => {
                const expObject = Object.values(exp.exchangeRates)
                  .find(({ code }) => code === exp.currency);

                const ask = Number(expObject.ask);
                const value = Number(exp.value);

                return (
                  <tr key={ exp.id }>
                    <td>{exp.description}</td>
                    <td>{exp.tag}</td>
                    <td>{exp.method}</td>
                    <td>{value.toFixed(2)}</td>
                    <td>{expObject.name}</td>
                    <td>{ask.toFixed(2)}</td>
                    <td>{(value * ask).toFixed(2)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        className="delete-btn"
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => deleteExp(exp.id) }
                      >
                        <img src={ lixeira } alt="Deletar" />
                      </button>
                      <button
                        className="edit-btn"
                        data-testid="edit-btn"
                        type="button"
                        onClick={ () => editExp(exp.id) }
                      >
                        <img src={ edit } alt="Editar" />
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (id) => dispatch(deleteExpense(id)),
  editExp: (id) => dispatch(editExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  deleteExp: PropTypes.func.isRequired,
  editExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
