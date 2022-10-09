import React from 'react';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet">
        <div className="background center" />
        <div className="wallet-header">
          <Header />
          <WalletForm />
        </div>
        <div className="wallet-table">
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
