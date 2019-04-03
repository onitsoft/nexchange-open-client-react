import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from 'Src/i18n';
import axios from 'axios';
import config from 'Config';
import { fetchOrderBook, errorAlert } from 'Actions/index.js';

import CoinSelector from '../ExchangeWidget/CoinInput/CoinSelector/CoinSelector';
import OrderDepth from './OrderDepth/OrderDepth';
import LimitOrderForm from './LimitOrderForm/LimitOrderForm';

import styles from './OrderBookWidget.scss';


class OrderBookWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      loading: false,
    };

    this.placeOrder = this.placeOrder.bind(this);
  }


  componentDidUpdate(prevProps, prevState) {
    if(this.props.selectedCoin && this.props.selectedCoin.receive !== prevProps.selectedCoin.receive || 
      this.props.selectedCoin.deposit !== prevProps.selectedCoin.deposit) {
        this.fetchOrderBook();
    }
  }

  fetchOrderBook = () => {
    const pair = `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`;
    const orderBook = this.props.orderBook;
    const fetch = () => {
      const payloads = [{
        orderBook,
        pair,
        type: "SELL",
        status: "OPEN"
      },{
        orderBook,
        pair,
        type: "BUY",
        status: "OPEN"
      },{
        orderBook,
        pair,
        status: "CLOSED"
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

  placeOrder() {
  }


  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className={styles.widget}>
                      <div className={styles['pair-selection']}>
                        <CoinSelector type="deposit" orderBook={true}/>
                        <CoinSelector type="receive" orderBook={true}/>
                      </div>
                      <LimitOrderForm />
                      <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
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
const mapDispatchToProps = dispatch => bindActionCreators({ fetchOrderBook, errorAlert }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBookWidget);
