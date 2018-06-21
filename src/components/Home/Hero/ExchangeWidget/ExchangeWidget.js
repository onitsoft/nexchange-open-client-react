import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from '../i18n';
import axios from 'axios';
import config from 'Config';

import { setWallet, errorAlert, setOrder } from 'Actions/index.js';
import { bindCrispEmail } from 'Utils/crispEmailBinding';

import CoinInput from './CoinInput/CoinInput';
import WalletAddress from './WalletAddress/WalletAddress';

import styles from './ExchangeWidget.scss';

class ExchangeWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      orderPlaced: false,
      loading: false,
    };

    this.placeOrder = this.placeOrder.bind(this);
    this.showWalletAddress = this.showWalletAddress.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  placeOrder() {
    let data = {
      amount_base: 0,
      amount_quote: 0,
      is_default_rule: true,
      pair: {
        name: `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`,
      },
      withdraw_address: {
        address: this.props.wallet.address,
        name: '',
      },
    };

    if (this.props.price.lastEdited === 'receive') data['amount_base'] = parseFloat(this.props.price.receive);
    else if (this.props.price.lastEdited === 'deposit') data['amount_quote'] = parseFloat(this.props.price.deposit);

    axios
      .post(`${config.API_BASE_URL}/orders/`, data)
      .then(response => {
        this.props.setOrder(response.data);
        this.setState({
          orderRef: response.data.unique_reference,
          orderPlaced: true,
          loading: false,
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        bindCrispEmail(this.props.store);

        window.ga('send', 'event', 'Order', 'place order', response.data.unique_reference);
        window.qp('track', 'Generic');
      })
      .catch(error => {
        console.log('Error:', error);

        let message =
          error.response && error.response.data.non_field_errors && error.response.data.non_field_errors.length
            ? error.response.data.non_field_errors[0]
            : `${i18n.t('subscription.5')}`;
        this.props.errorAlert({
          message: message,
          show: true,
          type: 'PLACE_ORDER',
        });

        this.setState({ orderPlaced: false, loading: false });
      });
  }

  showWalletAddress() {
    this.props.setWallet({ address: '', valid: false, show: true });

    setTimeout(() => {
      this.walletInputEl.focus();
    }, 300);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.wallet.show && nextProps.error.type === 'INVALID_AMOUNT' && nextProps.error.show !== false) {
      this.props.setWallet({ address: '', valid: false, show: false });
    }
  }

  render() {
    if (this.state.orderPlaced) return <Redirect to={`/order/${this.state.orderRef}`} />;
    return (
      <div className="col-xs-12">
        <div className={styles.container}>
          <CoinInput type="deposit" onSubmit={this.showWalletAddress} />
          <CoinInput type="receive" onSubmit={this.showWalletAddress} />

          <WalletAddress onSubmit={this.placeOrder} inputRef={el => (this.walletInputEl = el)} />

        <I18n ns="translations">
         {(t) => (
          <div className="col-xs-12 text-center">
            {!this.props.wallet.show ? (
              <button
                className="btn btn-block btn-primary proceed"
                onClick={this.showWalletAddress}
                disabled={
                  this.props.error.show && (this.props.error.type === 'INVALID_AMOUNT' || this.props.error.type === 'INVALID_PAIR')
                    ? 'disabled'
                    : null
                }
              >
                {t('exchangewidget.1')}
              </button>
            ) : (
              <button
                className="btn btn-block btn-primary proceed"
                onClick={this.placeOrder}
                disabled={this.props.wallet.valid && !this.state.loading ? null : 'disabled'}
              >
                {t('exchangewidget.2')}
                {this.state.loading ? <i className="fab fa-spinner fa-spin" style={{ marginLeft: '10px' }} /> : null}
              </button>
            )}

            <p id="fee-info">The indicated price is final, all fees are included.</p>
          </div>
			)}
		  </I18n>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price, error, wallet }) => ({
  selectedCoin,
  price,
  error,
  wallet,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWallet: setWallet,
      setOrder: setOrder,
      errorAlert: errorAlert,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeWidget);
