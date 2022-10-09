import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

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
              expenses.map((exp, index) => {
                const expObject = Object.values(exp.exchangeRates)
                  .find(({ code }) => code === exp.currency);

                const ask = Number(expObject.ask);
                const value = Number(exp.value);

                return (
                  <tr key={ index }>
                    <td>{exp.description}</td>
                    <td>{exp.tag}</td>
                    <td>{exp.method}</td>
                    <td>{value.toFixed(2)}</td>
                    <td>{expObject.name}</td>
                    <td>{ask.toFixed(2)}</td>
                    <td>{(value * ask).toFixed(2)}</td>
                    <td>Real</td>
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

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Table);
