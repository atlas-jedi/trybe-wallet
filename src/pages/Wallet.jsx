import React from 'react';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet">
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
