import React, { Component } from 'react';
import _ from 'lodash';
import getBlockchainUrl from 'Utils/getBlockchainUrl';
import config from 'Config';
import OrderStateLoader from '../OrderIcons/OrderStateLoader/OrderStateLoader';
import OrderLinks from '../OrderLinks/OrderLinks';
import styles from '../OrderState.scss';

class OrderPayment extends Component {
  constructor(props) {
    super(props);

    this.coin = props.order.pair.quote;
    this.minConfirmations = this.coin.min_confirmations;
    this.tx = _.find(props.order.transactions, { type: 'D' });
    this.txId = this.tx.tx_id;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.tx = _.find(nextProps.order.transactions, { type: 'D' });
    this.txId = this.tx.tx_id;
  }

  render() {
    if (this.txId === '' || this.txId === null) {
      return (
        <div className={styles.container}>
          <OrderStateLoader />
          <h2 className={styles.title}>Waiting for transaction deposit...</h2>
          <a href={`${config.API_BASE_URL}/orders/${this.props.order.unique_reference}`} target="_blank">
            <h4 style={{ margin: '25px 0 0px', fontWeight: '500' }}>See your order details on our API</h4>
          </a>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <OrderStateLoader />
        <h2 className={styles.title}>
          Transaction detected, awaiting confirmations{' '}
          <span>
            ({this.tx.confirmations}/{this.minConfirmations})
          </span>
        </h2>
        <h3 className={styles.subtitle}>
          Transaction ID:{' '}
          <a href={getBlockchainUrl(this.coin.code, this.txId)} target="_blank">
            {this.tx.tx_id}
          </a>
        </h3>

        <OrderLinks coin={this.coin.code} txId={this.txId} {...this.props} />
      </div>
    );
  }
}

export default OrderPayment;
