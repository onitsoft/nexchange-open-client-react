import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from 'Src/i18n';
import axios from 'axios';
import config from 'Config';

import { errorAlert, setOrder } from 'Actions/index.js';
// import { bindCrispEmail } from 'Utils/crispEmailBinding';

import CoinInput from './CoinInput/CoinInput';
import CoinSwitch from './CoinSwitch/CoinSwitch';

import styles from './ExchangeWidget.scss';

class ExchangeWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      orderPlaced: false,
      loading: false,
    };

    this.placeOrder = this.placeOrder.bind(this);
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
      withdraw_address: {},
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

        // bindCrispEmail(this.props.store);

        window.gtag('event', 'Place order', { event_category: 'Order', event_label: `${response.data.unique_reference}` });

        //Store order history in local storage
        let newOrder = {
          id: response.data.unique_reference,
          mode: 'INSTANT',
          base: this.props.selectedCoin.deposit,
          amount_base: parseFloat(this.props.price.deposit),
          quote: this.props.selectedCoin.receive,
          amount_quote: parseFloat(this.props.price.receive),
          created_at: new Date(),
        };
        let orderHistory = localStorage['orderHistory'];
        if (!orderHistory) {
          orderHistory = [newOrder];
        } else {
          orderHistory = JSON.parse(orderHistory);
          orderHistory.push(newOrder);
        }
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      })
      .catch(error => {
        console.log('Error:', error);

        /* eslint max-len: ["error", { "code": 200 }] */
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

  render() {
    const lang = i18n.language ? i18n.language : 'en';

    if (this.state.orderPlaced) return <Redirect push to={`/${lang}/order/${this.state.orderRef}`} />;

    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className={styles.widget}>
                    <CoinInput type="deposit" />
                    <CoinSwitch />
                    <CoinInput type="receive" />

                    <div className={styles.submit}>
                      <p className={styles.info}>{t('order.feeinfo')}</p>

                      {/* eslint max-len: ["error", { "code": 200 }] */}
                      <button
                        className={`${styles.btn} ${!this.state.loading ? null : 'disabled'} btn btn-block btn-primary proceed `}
                        onClick={this.placeOrder}
                        ref={el => {
                          this.button = el;
                        }}
                      >
                        {t('exchangewidget.2')}
                        {this.state.loading ? <i className="fab fa-spinner fa-spin" style={{ marginLeft: '10px' }} /> : null}
                      </button>
                      <p
                        className={styles.infotc}
                        dangerouslySetInnerHTML={{ __html: t('order.byclickTC', { buttonName: t('exchangewidget.2') }) }}
                      />
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

const mapStateToProps = ({ selectedCoin, price, error }) => ({
  selectedCoin,
  price,
  error,
});
const mapDispatchToProps = dispatch => bindActionCreators({ setOrder, errorAlert }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWidget);
