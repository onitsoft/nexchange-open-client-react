import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorAlert, setWallet, selectCoin, fetchPrice } from 'Actions/index.js';
import validateWalletAddress from 'Utils/validateWalletAddress';
import styles from './WalletAddress.scss';
import AddressHistory from './AddressHistory/AddressHistory';
import { I18n } from 'react-i18next';
import i18n from '../../../../../i18n';

import urlParams from 'Utils/urlParams';


class WalletAddress extends Component {
  constructor(props) {
    super(props);

    this.state = { address: '', firstLoad: true , showHistory: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = (address, receiveCoin) => {
    if (address === '' || !receiveCoin) {
      this.props.setWallet({
        address,
        valid: false,
      });

      return this.props.errorAlert({ show: false });
    }

    const valid = validateWalletAddress(
      address,
      receiveCoin,
      () =>
        this.props.errorAlert({
          show: true,
          message: `${address} ${i18n.t('error.novalid')} ${receiveCoin} ${i18n.t('generalterms.address')}.`,
        }),
      () => this.props.errorAlert({ show: false })
    );

    this.props.setWallet({
      address,
      valid,
    });
  };

  handleChange(event) {
    const address = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    let showHistory = false;
    if(!address) { showHistory = true; }
    this.setState({ address, showHistory });
    this.validate(address, this.props.selectedCoin[this.props.withdraw_coin]);
  }

  handleFocus(event) {
    this.setState({
      showHistory: true
    });
  }

  handleBlur(event) {
    this.setState({
      showHistory: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCoin[this.props.withdraw_coin] !== this.props.selectedCoin[this.props.withdraw_coin]) {
      this.validate(this.state.address, nextProps.selectedCoin[this.props.withdraw_coin]);
    }

    if(this.props.orderMode != 'ORDER_BOOK') {
      let orderHistory = localStorage['orderHistory']; 
      try {
        //Most recent order for each address
        this.orderHistory = orderHistory ? _.uniqBy(JSON.parse(orderHistory).reverse(), 'withdraw_address') : [];
      } catch (e) {
        this.orderHistory = [];
      }
    }
  }

  componentDidUpdate(){
    //Check if withdraw_address url param exists. If exists, prefill address field with that value
    const params = urlParams();
    if (params && params.hasOwnProperty('withdraw_address') && !this.props.wallet.address
      && this.props.selectedCoin[this.props.withdraw_coin] && this.state.firstLoad) {
        const simulatedEvent ={target: {value: params['withdraw_address'].toString()}};
        this.handleChange(simulatedEvent);
        this.setState({firstLoad: false});
        this.props.button.focus();
      }
  }

  setAddress(address) {
    const simulatedEvent ={target: {value: address}};
    this.handleChange(simulatedEvent);
    this.props.button.focus();
  }

  setCoin(depositCoin, receiveCoin) {
    //Select coin
    this.props.selectCoin({
      ...this.props.selectedCoin,
      ['deposit']: depositCoin,
      ['receive']: receiveCoin,
    }, this.props.pairs);

    //Update quote value
    const pair = `${receiveCoin}${depositCoin}`;
    const data = {
      pair,
      lastEdited: 'receive',
    };

    data['deposit'] = receiveCoin;
    data['receive'] = depositCoin;
    this.props.fetchPrice(data);
  }

  render() {
    let coin = this.props.selectedCoin[this.props.withdraw_coin] ? this.props.selectedCoin[this.props.withdraw_coin] : '...';
    return (
      <I18n ns="translations">
        {t => (
          <div className="col-xs-12 active">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <input
                type="text"
                ref={this.props.inputRef}
                className={`form-control ${styles.input}`}
                id="withdraw-addr"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.state.address}
                autoComplete="off"
                autoFocus={this.props.orderMode === 'ORDER_BOOK' ? 'false' : 'true'}
                placeholder={t('generalterms.youraddress', { selectedCoin: coin })}
              />
              {this.state.showHistory && this.props.orderMode != 'ORDER_BOOK' ?
                <AddressHistory history={this.orderHistory} setAddress={this.setAddress} setCoin={this.setCoin} />
                :  null}
            </form>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ orderMode, selectedCoin, wallet, pairs }) => ({ orderMode, selectedCoin, wallet, pairs });
const mapDispatchToProps = dispatch => bindActionCreators({ errorAlert, setWallet, selectCoin, fetchPrice }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddress);
