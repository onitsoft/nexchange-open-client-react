import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';
import { selectCoin, fetchPrice, setWallet, errorAlert } from '../actions/index.js';
import CoinsDropdown from './CoinsDropdown';
import '../css/_coin-selector.scss';
require('react-fa');

class CoinSelector extends Component {
  state = {
    isDropdownVisible: false,
    selectedCoin: null,
  };

  selectCoin = coin => {
    this.props.selectCoin({
      ...this.props.selectedCoin,
      [this.props.type]: coin,
      lastSelected: this.props.type,
    });

    this.setState({ isDropdownVisible: false });
    ga('send', 'event', 'Order', 'select coin');
  };

  handleClickOutside = event => {
    this.setState({ isDropdownVisible: false });
  };

  calculateDepositAmount = coin => {
    return ['EUR', 'GBP', 'USD'].indexOf(coin.name) > -1 ? 100 : parseFloat(coin.minimal_amount) * 100;
  };

  handleClick = code => {
    this.selectCoin(code);
    this.props.onSelect();
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    // This condition means that we have selected default currency pairs
    // and now need to fetch price.
    if (this.props.selectedCoin.deposit === null && nextProps.selectedCoin.deposit && nextProps.type === 'deposit') {
      this.props.fetchPrice({
        pair: `${nextProps.selectedCoin.receive}${nextProps.selectedCoin.deposit}`,
        lastEdited: 'deposit',
      });
    }

    // This condition means that selected coin has been changed and price
    // needs to be refetched.
    if (
      this.props.selectedCoin[this.props.type] !== nextProps.selectedCoin[this.props.type] &&
      ((this.props.type === 'deposit' && nextProps.selectedCoin.lastSelected === 'deposit') ||
        (this.props.type === 'receive' && nextProps.selectedCoin.lastSelected === 'receive'))
    ) {
      this.props.fetchPrice({
        pair: `${nextProps.selectedCoin.receive}${nextProps.selectedCoin.deposit}`,
        lastEdited: nextProps.selectedCoin.lastSelected,
      });
    }

    // Check if pair is valid. If not, show error.
    if (
      nextProps.selectedCoin.deposit &&
      nextProps.selectedCoin.receive &&
      !this.props.pairs[nextProps.selectedCoin.deposit][nextProps.selectedCoin.receive]
    ) {
      const validPairs = Object.keys(this.props.pairs[nextProps.selectedCoin.deposit])
        .map(coin => coin)
        .filter(coin => this.props.pairs[nextProps.selectedCoin.deposit][coin] === true)
        .join(', ');

      this.props.errorAlert({
        message: `You cannot buy ${nextProps.selectedCoin.receive} with ${nextProps.selectedCoin.deposit}. Try ${validPairs}.`,
        show: true,
        type: 'INVALID_PAIR',
      });
    }
  };

  render() {
    const type = this.props.type;
    const selectedCoin = this.props.selectedCoin[type];

    if (!selectedCoin) return null;

    return (
      <div>
        <div
          className={`selectedCoin selectedCoin-${type}`}
          onClick={() => this.setState({ isDropdownVisible: !this.state.isDropdownVisible })}
        >
          <span>{selectedCoin}</span>
          <i className={`coin-icon cc ${selectedCoin}`} />
          <i className="fa fa-angle-down" />
        </div>

        {this.state.isDropdownVisible && <CoinsDropdown type={type} onClick={this.handleClick} coinsInfo={this.props.coinsInfo} />}
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, coinsInfo, pairs, price }) => ({ selectedCoin, coinsInfo, pairs, price });
const mapDispatchToProps = dispatch => bindActionCreators({ selectCoin, fetchPrice, setWallet, errorAlert }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(CoinSelector));
