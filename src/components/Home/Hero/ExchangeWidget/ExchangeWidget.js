import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from 'Src/i18n';
import axios from 'axios';
import config from 'Config';

import { setWallet, errorAlert, setOrder, setDestinationTag, setPaymentId, setMemo } from 'Actions/index.js';
import { bindCrispEmail } from 'Utils/crispEmailBinding';

import CoinInput from './CoinInput/CoinInput';
import CoinSwitch from './CoinSwitch/CoinSwitch';
import WalletAddress from './WalletAddress/WalletAddress';
import OrderModeSwitch from '../OrderModeSwitch/OrderModeSwitch';
import DestinationTag from './WalletAddress/DestinationTag';
import PaymentId from './WalletAddress/PaymentId';
import Memo from './WalletAddress/Memo';
import Integrations from '../Integrations/Integrations';

import styles from './ExchangeWidget.scss';

class ExchangeWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      orderPlaced: false,
      loading: false,
    };

    this.placeOrder = this.placeOrder.bind(this);
    this.focusWalletAddress = this.focusWalletAddress.bind(this);
    this.focusDestinationTag = this.focusDestinationTag.bind(this);
    this.focusPaymentId = this.focusPaymentId.bind(this);
    this.focusMemo = this.focusMemo.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  placeOrder() {
    if (!this.props.wallet.valid) {
      if (this.props.selectedCoin.receive && this.props.wallet.address === '') {
        window.gtag('event', 'Place order with empty wallet address', {event_category: 'Order', event_label: ``});
      }

      this.props.errorAlert({
        show: true,
        message: `${i18n.t('error.providevalid')} ${this.props.selectedCoin.receive} ${i18n.t('generalterms.address')}.`,
      });
      this.focusWalletAddress();
      return;
    }

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
        payment_id: this.props.paymentId.paymentId,
        destination_tag: this.props.destinationTag.destinationTag,
        memo: this.props.memo.memo,
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

        window.gtag('event', 'Place order', {event_category: 'Order', event_label: `${response.data.unique_reference}`});

        //Store order history in local storage
        let newOrder = {
            id: response.data.unique_reference,
            mode: 'INSTANT',
            base: this.props.selectedCoin.deposit,
            amount_base: parseFloat(this.props.price.deposit),
            quote: this.props.selectedCoin.receive,
            amount_quote: parseFloat(this.props.price.receive),
            withdraw_address: this.props.wallet.address,
            created_at: new Date()
        }
        let orderHistory = localStorage['orderHistory'];
        if(!orderHistory){
          orderHistory = [newOrder];
        }
        else {
          orderHistory = JSON.parse(orderHistory);
          orderHistory.push(newOrder);
        }
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      })
      .catch(error => {
        console.log('Error:', error);

        /* eslint max-len: ["error", { "code": 200 }] */
        let message = error.response && error.response.data.non_field_errors && error.response.data.non_field_errors.length ? error.response.data.non_field_errors[0] : `${i18n.t('subscription.5')}`;

        this.props.errorAlert({
          message: message,
          show: true,
          type: 'PLACE_ORDER',
        });

        this.setState({ orderPlaced: false, loading: false });
      });
  }

  focusWalletAddress() {
    if(this.walletInputEl) {
      this.walletInputEl.focus();
    }
  }

  focusDestinationTag() {
    this.destinationTagInputEl.focus();
  }

  focusPaymentId() {
    this.paymentIdInputEl.focus();
  }

  focusMemo() {
    this.memoInputEl.focus();
  }

  render() {
    if (this.state.orderPlaced) return <Redirect to={`/order/${this.state.orderRef}`} />;

    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className={styles.widget}>
                    <OrderModeSwitch orderMode={this.props.orderMode} changeOrderMode={this.props.changeOrderMode}/>
                    <CoinInput type="deposit" onSubmit={this.showWalletAddress} walletInput={this.walletInputEl} />
                    <CoinSwitch />
                    <CoinInput type="receive" onSubmit={this.showWalletAddress} walletInput={this.walletInputEl} />

                    <WalletAddress 
                      withdraw_coin="receive" 
                      onSubmit={this.placeOrder} 
                      inputRef={el => (this.walletInputEl = el)} 
                      button={this.button} 
                      focusWalletAddress={this.focusWalletAddress}/>
                    { this.props.selectedCoin.receive === 'XRP' ? <DestinationTag onSubmit={this.placeOrder} inputRef={el => (this.destinationTagInputEl = el)} />  : null }
                    { this.props.selectedCoin.receive === 'XMR' ? <PaymentId onSubmit={this.placeOrder} inputRef={el => (this.paymentIdInputEl = el)} /> : null }
                    { this.props.selectedCoin.receive === 'XLM' ? <Memo onSubmit={this.placeOrder} inputRef={el => (this.memoInputEl = el)} /> : null }
                    <div className={styles.submit}>
                      <p className={styles.info}>{t('order.feeinfo')}</p>

                      {/* eslint max-len: ["error", { "code": 200 }] */}
                      <button className={`${styles.btn} ${this.props.wallet.valid && !this.state.loading ? null : 'disabled'} btn btn-block btn-primary proceed `}
                      onClick={this.placeOrder} ref={(el) => { this.button = el; }} >
                        {t('exchangewidget.2')}
                        {this.state.loading ? <i className="fab fa-spinner fa-spin" style={{ marginLeft: '10px' }} /> : null}
                      </button>
                        <p className={styles.infotc} dangerouslySetInnerHTML={{__html: t('order.byclickTC', {'buttonName':t('exchangewidget.2')})}}/>
                    </div>
                    <Integrations/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price, error, wallet, destinationTag, paymentId, memo }) => ({ selectedCoin, price, error, wallet, destinationTag, paymentId, memo });
const mapDispatchToProps = dispatch => bindActionCreators({ setWallet, setOrder, errorAlert, setDestinationTag, setPaymentId, setMemo }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeWidget);
