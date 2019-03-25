import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from 'Src/i18n';
import axios from 'axios';
import config from 'Config';

import { setWallet, errorAlert, setOrder } from 'Actions/index.js';
import { bindCrispEmail } from 'Utils/crispEmailBinding';

import CoinInput from './CoinInput/CoinInput';
import CoinSwitch from './CoinSwitch/CoinSwitch';
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
    this.focusWalletAddress = this.focusWalletAddress.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  placeOrder() {
    if (!this.props.wallet.valid) {
      if (this.props.selectedCoin.receive && this.props.wallet.address === '') {
        window.ga('send', 'event', {
          eventCategory: 'Order',
          eventAction: 'Place order with empty wallet address',
        });

        this.props.errorAlert({
          show: true,
          message: `${i18n.t('error.providevalid')} ${this.props.selectedCoin.receive} ${i18n.t('generalterms.address')}.`,
        });
      }

      this.walletInputEl.focus();
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

      //Store address in local storage
      let addressHitory = localStorage[`${this.props.selectedCoin.receive}addressHistory`];
      if(!addressHitory){
        addressHitory = this.props.wallet.address;
      }
      else {
        let addressHitoryArray = addressHitory.split(',');
        if(addressHitoryArray.indexOf(this.props.wallet.address) === -1){
          addressHitory = addressHitoryArray.concat([this.props.wallet.address]).join(',');
        }
      }
      localStorage.setItem(`${this.props.selectedCoin.receive}addressHistory`, addressHitory);
  }

  focusWalletAddress() {
    this.walletInputEl.focus();
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
                    <CoinInput type="deposit" onSubmit={this.showWalletAddress} />
                    <CoinSwitch />
                    <CoinInput type="receive" onSubmit={this.showWalletAddress} />

                    <WalletAddress onSubmit={this.placeOrder} inputRef={el => (this.walletInputEl = el)} button={this.button} />
                    <div className={styles.submit}>
                      <p className={styles.info}>{t('order.feeinfo')}</p>

                      {/* eslint max-len: ["error", { "code": 200 }] */}
                      <button ref={ref => {this.button = ref}}
                        className={`${styles.btn} ${this.props.wallet.valid && !this.state.loading ? null : 'disabled'} btn btn-block btn-primary proceed `} onClick={this.placeOrder}>
                        {t('exchangewidget.2')}
                        {this.state.loading ? <i className="fab fa-spinner fa-spin" style={{ marginLeft: '10px' }} /> : null}
                      </button>
                        <p className={styles.infotc} dangerouslySetInnerHTML={{__html: t('order.byclickTC', {'buttonName':t('exchangewidget.2')})}}/>
                    </div>
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

const mapStateToProps = ({ selectedCoin, price, error, wallet }) => ({ selectedCoin, price, error, wallet });
const mapDispatchToProps = dispatch => bindActionCreators({ setWallet, setOrder, errorAlert }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeWidget);
