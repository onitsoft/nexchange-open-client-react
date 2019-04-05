import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from 'Src/i18n';
import axios from 'axios';
import config from 'Config';
import { fetchOrderBook, errorAlert, changeOrderBookOrderType } from 'Actions/index.js';

import CoinSelector from '../ExchangeWidget/CoinInput/CoinSelector/CoinSelector';
import WalletAddress from '../ExchangeWidget/WalletAddress/WalletAddress';
import OrderDepth from './OrderDepth/OrderDepth';
import LimitOrderForm from './LimitOrderForm/LimitOrderForm';

import styles from './OrderBookWidget.scss';


class OrderBookWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      loading: false,
      amount_base: '',
      limit_rate: '',
    };

    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount(){
    if(this.props.selectedCoin){
      this.fetchOrderBook();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.selectedCoin && this.props.selectedCoin.receive !== prevProps.selectedCoin.receive || 
      this.props.selectedCoin.deposit !== prevProps.selectedCoin.deposit) {
        this.fetchOrderBook();
    }
  }


  fetchOrderBook = () => {
    const fetch = () => {
      const pair = `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`;
      const orderBook = this.props.orderBook;
      const payloads = [{
        orderBook,
        pair,
        type: 'SELL',
        status: 'OPEN'
      },{
        orderBook,
        pair,
        type: 'BUY',
        status: 'OPEN'
      },{
        orderBook,
        pair,
        status: 'CLOSED'
      }]
      payloads.forEach((payload) => this.props.fetchOrderBook(payload));
    }

    fetch();
    this.interval = setInterval(() => {
      fetch();
    }, config.ORDER_BOOK_FETCH_INTERVAL);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleOrderBookOrderTypeChange() {
    const orderBook = this.props.orderBook;
    if(orderBook.order_type === 'BUY') {
      orderBook.order_type = 'SELL';
    } else {
      orderBook.order_type = 'BUY';
    }
    this.props.changeOrderBookOrderType(orderBook);
  }

  handleLimitRateChange = event => {
    let { value } = event.target;
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');
    this.setState({ limit_rate: value });

    window.gtag('event', 'Change limit rate', {event_category: 'Order Book', event_label: ``});
  };


  handleAmountBaseChange = event => {
    let { value } = event.target;
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');
    this.setState({ amount_base: value });

    window.gtag('event', 'Change amount', {event_category: 'Order Book', event_label: ``});
  };

  placeOrder() {
    if (!this.props.wallet.valid) {
      if (this.props.selectedCoin.receive && this.props.wallet.address === '') {
        window.gtag('event', 'Place order with empty wallet address', {event_category: 'Order Book', event_label: ``});

        this.props.errorAlert({
          show: true,
          message: `${i18n.t('error.providevalid')} ${this.props.selectedCoin.receive} ${i18n.t('generalterms.address')}.`,
        });
      }

      this.walletInputEl.focus();
      return;
    }

    console.log(this.state.amount_base);
    let data = {
      pair: {
        name: `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`
      },
      order_type: 'SELL',
      amount_base: parseFloat(this.state.amount_base),
      amount_quote: parseFloat(this.state.amount_base) * parseFloat(this.state.limit_rate),
      limit_rate: parseFloat(this.state.limit_rate),
      withdraw_address: {
          name: '',
          address: '0x7d04d2edc058a1afc761d9c99ae4fc5c85d4c8a6'
      },
      refund_address: {
          name: 'REFUND ADDRESS',
          address: this.props.wallet.address
      }
    };

    // if (this.props.price.lastEdited === 'receive') data['amount_base'] = parseFloat(this.props.price.receive);
    // else if (this.props.price.lastEdited === 'deposit') data['amount_quote'] = parseFloat(this.props.price.deposit);

    console.log(JSON.stringify(data));

    axios
      .post(`${config.API_BASE_URL}/limit_order/`, data)
      .then(response => {
        console.log(response);
        
        // this.props.setOrder(response.data);
        // this.setState({
        //   orderRef: response.data.unique_reference,
        //   orderPlaced: true,
        //   loading: false,
        // });

        // if (response.data.token) {
        //   localStorage.setItem('token', response.data.token);
        // }

        // bindCrispEmail(this.props.store);

        // window.gtag('event', 'Place order', {event_category: 'Order Book', event_label: `${response.data.unique_reference}`});

        // //Store order history in local storage
        // let newOrder = {
        //     id: response.data.unique_reference,
        //     base: this.props.selectedCoin.deposit,
        //     amount_base: parseFloat(this.props.price.deposit),
        //     quote: this.props.selectedCoin.receive,
        //     amount_quote: parseFloat(this.props.price.receive),
        //     withdraw_address: this.props.wallet.address,
        //     created_at: new Date()
        // }
        // let orderHistory = localStorage['orderHistory'];
        // if(!orderHistory){
        //   orderHistory = [newOrder];
        // }
        // else {
        //   orderHistory = JSON.parse(orderHistory);
        //   orderHistory.push(newOrder);
        // }
        // localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      })
      .catch(error => {
        console.log('Error:', error);

        /* eslint max-len: ['error', { 'code': 200 }] */
        let message = error.response && error.response.data.non_field_errors && 
        error.response.data.non_field_errors.length ? error.response.data.non_field_errors[0] : `${i18n.t('subscription.5')}`;

        this.props.errorAlert({
          message: message,
          show: true,
          type: 'PLACE_ORDER',
        });

        this.setState({ orderPlaced: false, loading: false });
      });
  }


  render() {
    const order_type = this.props.orderBook.order_type;
    return (
      <I18n ns='translations'>
        {t => (
          <div className={styles.container}>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12'>
                  <div className={styles.widget}>
                      <div className={styles['pair-selection']}>
                        <CoinSelector type='deposit' orderBook={true}/>
                        <CoinSelector type='receive' orderBook={true}/>
                      </div>
                      <ul className='nav nav-tabs'>
                        <li className={`${order_type == 'BUY' ? 'active' : ''}`}><a onClick={() => this.handleOrderBookOrderTypeChange()}>Buy</a></li>
                        <li className={`${order_type == 'SELL' ? 'active' : ''}`}><a onClick={() => this.handleOrderBookOrderTypeChange()}>Sell</a></li>
                      </ul>
                      <LimitOrderForm 
                        amount_base={this.state.amount_base}
                        handleAmountBaseChange={this.handleAmountBaseChange} 
                        limit_rate={this.state.limit_rate}
                        handleLimitRateChange={this.handleLimitRateChange} />
                      <WalletAddress withdraw_coin={`${order_type == 'BUY' ? 'deposit' : 'receive'}`} />
                      <div className='col-xs-12'>
                        <button className={`${styles.btn} ${this.props.wallet.valid && !this.state.loading ? null : 'disabled'} btn btn-block btn-primary proceed `}
                        onClick={() => this.placeOrder()} ref={(el) => { this.button = el; }} >
                          {order_type == 'BUY' 
                          ? `Buy ${this.props.selectedCoin.deposit} with ${this.props.selectedCoin.receive}`
                          : `Sell ${this.props.selectedCoin.receive} for ${this.props.selectedCoin.deposit}`
                          }
                        </button>
                      </div>                  
                      <div className={`col-xs-12 col-sm-12 col-md-5 col-lg-4`}>
                        <OrderDepth 
                          side={`sell`} 
                          selectedCoins={this.props.selectedCoin}
                          depth={this.props.orderBook.sellDepth} />
                        <OrderDepth 
                          side={`buy`} 
                          selectedCoins={this.props.selectedCoin}
                          depth={this.props.orderBook.buyDepth} />
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

const mapStateToProps = ({ selectedCoin, price, error, wallet, orderBook }) => ({ selectedCoin, price, error, wallet, orderBook });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchOrderBook, changeOrderBookOrderType, errorAlert }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBookWidget);
