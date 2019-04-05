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
      quantity: '',
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

    // window.gtag('event', 'Change limit rate', {event_category: 'Order Book', event_label: ``});
  };


  handleQuantityChange = event => {
    let { value } = event.target;
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');
    this.setState({ quantity: value });

    // window.gtag('event', 'Change quantity', {event_category: 'Order Book', event_label: ``});
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


    //TO DELETE - HARDCODED
    let order_type = null;
    let refund_address = null;
    if(this.props.orderBook.order_type === 'BUY'){
      order_type = 1;
      refund_address = 'DHKM6NDUUv9kaHAGi1QU7MRBNKfQiAdP3F';
    }
    if(this.props.orderBook.order_type === 'SELL'){
      order_type = 0;
      refund_address = '0xbb9bc244d798123fde783fcc1c72d3bb8c189413';
    }
      

    console.log(this.state.quantity);
    let data = {
      pair: {
        name: `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`
      },
      order_type,
      amount_base: parseFloat(this.state.quantity),
      amount_quote: parseFloat(this.state.quantity) * parseFloat(this.state.limit_rate),
      limit_rate: parseFloat(this.state.limit_rate),
      withdraw_address: {
          name: '',
          address: this.props.wallet.address
      },
      refund_address: {
          name: 'REFUND ADDRESS',
          address: refund_address
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
        console.log("error.response",error.response);
        

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
                        quantity={this.state.quantity}
                        handleQuantityChange={this.handleQuantityChange} 
                        limit_rate={this.state.limit_rate}
                        handleLimitRateChange={this.handleLimitRateChange} />
                      <WalletAddress withdraw_coin={`${order_type == 'BUY' ? 'receive' : 'deposit'}`} inputRef={el => (this.walletInputEl = el)} button={this.button} />
                      <div className='col-xs-12'>
                        <button className={`${styles.btn} ${this.props.wallet.valid && !this.state.loading ? null : 'disabled'} btn btn-block btn-primary proceed `}
                        onClick={() => this.placeOrder()} ref={(el) => { this.button = el; }} >
                          {order_type == 'BUY' 
                          ? `Buy ${this.props.selectedCoin.receive} with ${this.props.selectedCoin.deposit}`
                          : `Sell ${this.props.selectedCoin.deposit} for ${this.props.selectedCoin.receive}`
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
