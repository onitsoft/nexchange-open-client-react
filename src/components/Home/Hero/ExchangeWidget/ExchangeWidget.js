import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import config from 'Config';

import { setWallet, errorAlert, setOrder } from 'Actions/index.js';
import { bindCrispEmail } from 'Utils/crispEmailBinding';

import CoinInputs from './CoinInputs/CoinInputs';
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
          message: `Please put valid ${this.props.selectedCoin.receive} address.`,
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

        let message =
          error.response && error.response.data.non_field_errors && error.response.data.non_field_errors.length
            ? error.response.data.non_field_errors[0]
            : 'Something went wrong. Please try again later.';

        this.props.errorAlert({
          message: message,
          show: true,
          type: 'PLACE_ORDER',
        });

        this.setState({ orderPlaced: false, loading: false });
      });
  }

  focusWalletAddress() {
    this.walletInputEl.focus();
  }

  render() {
    if (this.state.orderPlaced) return <Redirect to={`/order/${this.state.orderRef}`} />;

    return (
      <div className={styles.container}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className={styles.widget}>
                <CoinInputs onSubmit={this.focusWalletAddress} />
                <WalletAddress onSubmit={this.placeOrder} inputRef={el => (this.walletInputEl = el)} />

                <div className={styles.submit}>
                  <p className={styles.info}>The indicated price is final, all fees are included.</p>

                  <button
                    className={`${styles.btn} ${
                      this.props.wallet.valid && !this.state.loading ? null : 'disabled'
                    } btn btn-block btn-primary proceed `}
                    onClick={this.placeOrder}
                  >
                    Confirm & Place Order
                    {this.state.loading ? <i className="fab fa-spinner fa-spin" style={{ marginLeft: '10px' }} /> : null}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price, error, wallet }) => ({ selectedCoin, price, error, wallet });
const mapDispatchToProps = dispatch => bindActionCreators({ setWallet, setOrder, errorAlert }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeWidget);
