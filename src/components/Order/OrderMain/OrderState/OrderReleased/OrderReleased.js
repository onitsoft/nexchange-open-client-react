import React, { Component } from 'react';
import _ from 'lodash';
import getBlockchainUrl from 'Utils/getBlockchainUrl';
import OrderLinks from '../OrderLinks/OrderLinks';
import styles from '../OrderState.scss';

class OrderReleased extends Component {
  constructor(props) {
    super(props);

    this.coin = props.order.pair.base;
    this.minConfirmations = this.coin.min_confirmations;
    this.tx = _.find(props.order.transactions, { type: 'W' });
    this.txId = this.tx.tx_id;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.tx = _.find(nextProps.order.transactions, { type: 'W' });
    this.txId = this.tx.tx_id;
  }

  render() {
    if (this.txId === '' || this.txId === null) {
      return (
        <div className={styles.container}>
          <h2 className={styles.title}>Processing withdrawal...</h2>
          <OrderLinks {...this.props} />
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          Funds released, awaiting confirmations ({this.tx.confirmations}/{this.minConfirmations})
        </h2>
        <h3 className={styles.subtitle}>
          Transaction ID:{' '}
          <a href={getBlockchainUrl(this.coin.code, this.txId)} target="_blank" className="text-green">
            {this.txId}
          </a>
        </h3>

        <OrderLinks coin={this.coin.code} txId={this.txId} {...this.props} />
      </div>
    );
  }
}

export default OrderReleased;
