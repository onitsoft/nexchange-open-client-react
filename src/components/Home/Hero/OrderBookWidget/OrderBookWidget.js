import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
import MyOrders from './MyOrders/MyOrders';
import OrderModeSwitch from '../OrderModeSwitch/OrderModeSwitch';

import urlParams from 'Utils/urlParams';
import styles from './OrderBookWidget.scss';


class OrderBookWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      loading: true,
      myOrdersExpanded: false
    };

    this.placeOrder = this.placeOrder.bind(this);
    this.focusWalletAddress = this.focusWalletAddress.bind(this);
    this.expandMyOrders = this.expandMyOrders.bind(this);
    this.collapseMyOrders = this.collapseMyOrders.bind(this);
  }

  UNSAFE_componentWillMount() {
    const params = urlParams();
    if (params && params.hasOwnProperty('myorders')) {
      this.setState({myOrdersExpanded: true});
      window.gtag('event', 'Entered my orders via URL', {event_category: 'Order Book', event_label: ``});
    }
  }


  componentDidMount(){
    window.gtag('event', 'Advanced Mode open', {event_category: 'Order Book', event_label: ``});
    if(this.props.selectedCoin){
      this.setState({loading: false});
      this.fetchOrderBook();
      if(this.quantityInputEl) { this.quantityInputEl.focus(); }
    }
  }

  UNSAFE_componentWillUpdate(nextProps) {
      //auto fill form values 
      const nullQuantityAndLimitPrice = !(this.props.orderBook.quantity > 0) && !(this.props.orderBook.limit_rate > 0);
      const pairChange = (nextProps.selectedCoin.deposit !== this.props.selectedCoin.deposit) || (nextProps.selectedCoin.receive !== this.props.selectedCoin.receive);
      const pricesFetched = nextProps.price.pair === `${nextProps.selectedCoin.receive}${nextProps.selectedCoin.deposit}` && (nextProps.price.receive > 0 && nextProps.price.deposit > 0);
      const orderBook = nextProps.orderBook;
      if((nullQuantityAndLimitPrice || pairChange) && pricesFetched) {
        orderBook.quantity = nextProps.price.min_amount_base;
        orderBook.limit_rate =  ((nextProps.price.deposit / nextProps.price.receive)).toFixed(9);
      } else if (pairChange && ! pricesFetched) {
        orderBook.quantity = 0;
        orderBook.limit_rate = 0;
      }
  }

  componentDidUpdate(prevProps, prevState) {
    if((this.props.selectedCoin && this.props.selectedCoin.receive !== prevProps.selectedCoin.receive) || 
      (this.props.selectedCoin.deposit !== prevProps.selectedCoin.deposit)) {
        clearInterval(this.interval);
        this.fetchOrderBook();
    }

    //Auto scroll
    const myOrdersElement = document.getElementById(`myOrders`);
    if(this.state.myOrdersExpanded !== prevState.myOrdersExpanded && !_.isEmpty(myOrdersElement)) {
      myOrdersElement.scrollIntoView({block: "start", behavior: "instant"});;
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

  expandMyOrders() {
    this.setState({myOrdersExpanded: true});
  }

  collapseMyOrders() {
    this.setState({myOrdersExpanded: false});
  }

  handleOrderBookOrderTypeChange(type) {
    const orderBook = this.props.orderBook;
    orderBook.order_type = type;
    this.props.changeOrderBookValue(orderBook);
  }


  focusWalletAddress() {
    if(this.walletInputEl) {
      this.walletInputEl.focus();
    }
  }

  placeOrder() {
    if (!this.props.wallet.valid) {
      if (this.props.selectedCoin.receive && this.props.wallet.address === '') {
        window.gtag('event', 'Place order with empty wallet address', {event_category: 'Order Book', event_label: ``});
      }

      this.props.errorAlert({
        show: true,
        message: `${i18n.t('error.providevalid')} ${this.props.selectedCoin.receive} ${i18n.t('generalterms.address')}.`,
      });

      this.walletInputEl.focus();
      return;
    }


    let pair = `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`;
    let order_type = null;
    if(this.props.orderBook.order_type === 'BUY'){
      order_type = 1;
    }
    if(this.props.orderBook.order_type === 'SELL'){
      order_type = 0;
    }


    let data = {
      pair: {
        name: pair
      },
      order_type,
      amount_base: parseFloat(this.props.orderBook.quantity),
      amount_quote: 0,
      limit_rate: parseFloat(this.props.orderBook.limit_rate),
      withdraw_address: {
          name: '',
          address: this.props.wallet.address
      },
    };

    axios
      .post(`${config.API_BASE_URL}/limit_order/`, data)
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

        window.gtag('event', 'Place order', {event_category: 'Order Book', event_label: `${response.data.unique_reference}`});

        //Store order history in local storage
        let newOrder = {
          id: response.data.unique_reference,
          mode: 'LIMIT',
          order_type: this.props.orderBook.order_type,
          base: this.props.selectedCoin.deposit,
          amount_base: parseFloat(response.data.amount_base),
          quote: this.props.selectedCoin.receive,
          amount_quote: parseFloat(response.data.amount_quote),
          limit_rate: parseFloat(response.data.limit_rate),
          deposit_address: response.data.deposit_address ? response.data.deposit_address.address : '',
          withdraw_address: response.data.withdraw_address ? response.data.withdraw_address.address : '',
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
        
        /* eslint max-len: ['error', { 'code': 200 }] */
        let message = error.response && error.response.data.non_field_errors && 
        error.response.data.non_field_errors.length ? error.response.data.non_field_errors[0] : `${i18n.t('subscription.5')}`;
        window.gtag('event', 'Error placing order', {event_category: 'Order Book', event_label: `${message}`});
        this.props.errorAlert({
          message: message,
          show: true,
          type: 'PLACE_ORDER',
        });

        this.setState({ orderPlaced: false, loading: false });
      });
  }


  render() {
    if (this.state.orderPlaced) return <Redirect to={`/order/${this.state.orderRef}`} />;

    const order_type = this.props.orderBook.order_type;
    const myOrdersExpanded = this.state.myOrdersExpanded;
    return (
      <I18n ns='translations'>
        {t => (
          <div className={`container ${styles.container}`}>
              <div className='row'>
                <div className='col-xs-12'>
                    {!myOrdersExpanded ? 
                      <div className={styles.widget}>
                      <OrderModeSwitch orderMode={this.props.orderMode} changeOrderMode={this.props.changeOrderMode}/>
                      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
                        <div className={`col-xs-12 ${styles['pair-selection']}`}>
                          <CoinSelector type='deposit' orderBook={true}/>
                          <CoinSelector type='receive' orderBook={true}/>
                        </div>
                        <ul className={`nav nav-tabs ${styles['tabs']}`} >
                          <li>
                            <a 
                              className={`clickable ${order_type === 'BUY' ? `${styles['active']}` : ''}`} 
                              onClick={() => this.handleOrderBookOrderTypeChange('BUY')}>{t('orderbookwidget.buy')}</a>
                              {order_type === 'BUY' ? <div className={`${styles['arrow-down']}`}></div> : null}
                          </li>
                          <li>
                            <a 
                              className={`clickable ${order_type === 'SELL' ? `${styles['active']}` : ''}`}
                              onClick={() => this.handleOrderBookOrderTypeChange('SELL')}>{t('orderbookwidget.sell')}</a>
                              {order_type === 'SELL' ? <div className={`${styles['arrow-down']}`}></div> : null}
                          </li>
                        </ul>
                        <LimitOrderForm 
                          inputRef={el => (this.quantityInputEl = el)}
                          quantity={this.props.orderBook.quantity}
                          limit_rate={this.props.orderBook.limit_rate}
                         />
                        <WalletAddress 
                          withdraw_coin={`${order_type === 'BUY' ? 'receive' : 'deposit'}`} 
                          inputRef={el => (this.walletInputEl = el)} 
                          focusWalletAddress={this.focusWalletAddress}
                          button={this.button} />
                        <div className='col-xs-12'>
                          <button className={`${styles.btn} ${order_type === 'BUY' ? styles['btn-buy'] : styles['btn-sell']} 
                          ${this.props.wallet.valid && !this.state.loading ? null : 'disabled'} btn btn-block btn-primary proceed `}
                          onClick={() => this.placeOrder()} ref={(el) => { this.button = el; }} >
                            {order_type === 'BUY' 
                            ? `${t('orderbookwidget.buy')} ${this.props.selectedCoin.receive} ${t('orderbookwidget.with')} ${this.props.selectedCoin.deposit}`
                            : `${t('orderbookwidget.sell')} ${this.props.selectedCoin.receive} ${t('orderbookwidget.for')} ${this.props.selectedCoin.deposit}`
                            }
                          </button>
                        </div>
                      </div>
                      <OrderDepth /> 
                      <MyOrders expanded={false} expandMyOrders={this.expandMyOrders} collapseMyOrders={this.collapseMyOrders}/></div> 
                      : <div className={styles.widget}><MyOrders expanded={true} expandMyOrders={this.expandMyOrders} collapseMyOrders={this.collapseMyOrders}/></div> }
                  </div>
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
