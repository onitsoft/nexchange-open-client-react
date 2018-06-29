import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPrice } from 'Actions/index.js';
import CoinInput from './CoinInput/CoinInput';

class CoinInputs extends Component {
  state = {
    deposit: '...',
    receive: '...',
    oldDeposit: '...',
    oldReceive: '...',
    fetching: false,
  };

  isSelectedCoinAmountChanged(lastEdited) {
    if (lastEdited === 'deposit' && this.state.deposit !== this.state.oldDeposit) {
      return true;
    } else if (lastEdited === 'receive' && this.state.receive !== this.state.oldReceive) {
      return true;
    }

    return false;
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    console.log(nextProps.price, this.state);

    if (nextProps.price.deposit !== this.state.deposit) {
      this.setState({ deposit: nextProps.price.deposit });
    }

    if (nextProps.price.receive !== this.state.receive) {
      this.setState({ receive: nextProps.price.receive });
    }

    // this.setState({ deposit: nextProps.price.deposit, receive: nextProps.price.receive });

    // if (nextProps.price.fetching) {
    //   // IF PRICE IS FETCHING, DO NOT SET NEW AMOUNTS
    //   // IF PRICE IS FETCHING, STORE CURRENT PRICE AND RECORD THAT PRICE IS STILL FETCHING
    //   // IF PRICE FINISHED FETCHING, SEE IF CURRENT PRICE CHANGED. IF YES, KEEP IT. IF NO, SET NEW AMOUNT.

    //   this.setState({ fetching: true, oldDeposit: this.state.deposit, oldReceive: this.state.receive });
    // } else if (nextProps.price.deposit !== this.state.deposit || nextProps.price.receive !== this.state.receive) {
    //   if (this.state.fetching && this.isSelectedCoinAmountChanged(nextProps.price.lastEdited)) {
    //   } else {
    //     this.setState({ deposit: nextProps.price.deposit, receive: nextProps.price.receive });
    //   }

    //   this.setState({ deposit: nextProps.price.deposit, receive: nextProps.price.receive });
    //   this.setState({ fetching: false });
    // }
  };

  render() {
    return (
      <div>
        <CoinInput
          type="deposit"
          value={this.state.deposit}
          onChange={value => this.setState({ deposit: parseFloat(value) })}
          onSubmit={this.props.focusWalletAddress}
        />
        <CoinInput
          type="receive"
          value={this.state.receive}
          onChange={value => this.setState({ receive: parseFloat(value) })}
          onSubmit={this.props.focusWalletAddress}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price }) => ({ selectedCoin, price });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchPrice }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinInputs);
