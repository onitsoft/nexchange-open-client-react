import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from 'Src/i18n';
import axios from 'axios';
import config from 'Config';

import { fetchOrderBook, errorAlert } from 'Actions/index.js';

import OrderDepth from './OrderDepth/OrderDepth';

import styles from './OrderBookWidget.scss';

import CoinInput from '../ExchangeWidget/CoinInput/CoinInput';

class OrderBookWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      loading: false,
    };

    this.placeOrder = this.placeOrder.bind(this);
  }

  componentWillUpdate(prevProps, prevState) {
    if(this.props.selectedCoin && this.props.selectedCoin.receive && this.props.selectedCoin.deposit) {
      this.props.fetchOrderBook(this.props.selectedCoin);
    }
  }

  componentDidMount() {

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
                      <CoinInput type="deposit"/>
                      <CoinInput type="receive"/>
                      <div className="col-xs-12">
                        <OrderDepth />
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
const mapDispatchToProps = dispatch => bindActionCreators({ fetchOrderBook, errorAlert }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBookWidget);
