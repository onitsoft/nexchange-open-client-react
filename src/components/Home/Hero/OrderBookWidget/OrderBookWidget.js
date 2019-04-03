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
    // Detect coin change by link
    if(this.props.selectedCoin.receive !== prevProps.selectedCoin.receive || 
      this.props.selectedCoin.deposit !== prevProps.selectedCoin.deposit) {
        this.props.fetchOrderBook(this.props.selectedCoin);
    }
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
                          depth={this.props.orderBook.orderBook.sellOrders} />
                        <OrderDepth 
                          side={`buy`} 
                          selectedCoins={this.props.selectedCoin}
                          depth={this.props.orderBook.orderBook.buyOrders} />
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
