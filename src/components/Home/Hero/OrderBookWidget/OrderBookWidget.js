import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from 'Src/i18n';
import axios from 'axios';
import config from 'Config';
import { setOrder, fetchOrderBook, errorAlert, changeOrderBookValue } from 'Actions/index.js';

import CoinSelector from '../ExchangeWidget/CoinInput/CoinSelector/CoinSelector';
import WalletAddress from '../ExchangeWidget/WalletAddress/WalletAddress';
import OrderDepth from './OrderDepth/OrderDepth';
import LimitOrderForm from './LimitOrderForm/LimitOrderForm';
import DepositModal from './DepositModal/DepositModal';
import MyOrders from './MyOrders/MyOrders';

import styles from './OrderBookWidget.scss';


class OrderBookWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      loading: false,
      showDepositModal: false
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
        clearInterval(this.interval);
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

  closeDepositModal = () => this.setState({ showDepositModal: false });

  handleOrderBookOrderTypeChange() {
    const orderBook = this.props.orderBook;
    if(orderBook.order_type === 'BUY') {
      orderBook.order_type = 'SELL';
    } else {
      orderBook.order_type = 'BUY';
    }
    this.props.changeOrderBookValue(orderBook);
  }

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
    let amount_base, amount_quote = 0;
    if(this.props.orderBook.order_type === 'BUY'){
      order_type = 1;
      refund_address = '0xbb9bc244d798123fde783fcc1c72d3bb8c189413';
      amount_base = parseFloat(this.props.orderBook.quantity) * parseFloat(this.props.orderBook.limit_rate);
      amount_quote = parseFloat(this.props.orderBook.quantity);
    }
    if(this.props.orderBook.order_type === 'SELL'){
      order_type = 0;
      refund_address = 'DBXu2kgc3xtvCUWFcxFE3r9hEYgmuaaCyD';
      amount_base =  parseFloat(this.props.orderBook.quantity);
      amount_quote = parseFloat(this.props.orderBook.quantity) * parseFloat(this.props.orderBook.limit_rate);
    }


    let data = {
      pair: {
        name: `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`
      },
      order_type,
      amount_base: amount_base,
      amount_quote: amount_quote,
      limit_rate: parseFloat(this.props.orderBook.limit_rate),
      withdraw_address: {
          name: '',
          address: this.props.wallet.address
      },
      refund_address: {
          name: 'REFUND ADDRESS',
          address: refund_address
      }
    };


    axios
      .post(`${config.API_BASE_URL}/limit_order/`, data)
      .then(response => {
        console.log(response);
        
        this.props.setOrder(response.data);


        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // bindCrispEmail(this.props.store);

        window.gtag('event', 'Place order', {event_category: 'Order Book', event_label: `${response.data.unique_reference}`});

        //Store limit order history in local storage
        let limitOrderHistory = localStorage['limitOrderHistory'];
        if(!limitOrderHistory){
          limitOrderHistory = response.data.unique_reference;
        }
        else {
          limitOrderHistory += `,${response.data.unique_reference}`;
        }
        localStorage.setItem('limitOrderHistory', limitOrderHistory);

        this.setState({ showDepositModal: true })
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

        this.setState({ loading: false });
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
                      <div className={`col-xs-12 ${styles['pair-selection']}`}>
                        <CoinSelector type='deposit' orderBook={true}/>
                        <CoinSelector type='receive' orderBook={true}/>
                      </div>
                      <ul className='col-xs-12 nav nav-tabs'>
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
                          : `Sell ${this.props.selectedCoin.receive} for ${this.props.selectedCoin.deposit}`
                          }
                        </button>
                      </div>                  
                      <OrderDepth 
                        side={`Selling`} 
                        selectedCoins={this.props.selectedCoin}
                        depth={this.props.orderBook.sellDepth} />
                      <OrderDepth 
                        side={`Buying`} 
                        selectedCoins={this.props.selectedCoin}
                        depth={this.props.orderBook.buyDepth} />
                      <MyOrders />
                    </div>
                  </div>
              </div>
              <DepositModal show={this.state.showDepositModal} onClose={this.closeDepositModal} />
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ order, selectedCoin, price, error, wallet, orderBook }) => ({ order, selectedCoin, price, error, wallet, orderBook });
const mapDispatchToProps = dispatch => bindActionCreators({ setOrder, fetchOrderBook, changeOrderBookValue, errorAlert }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBookWidget);
