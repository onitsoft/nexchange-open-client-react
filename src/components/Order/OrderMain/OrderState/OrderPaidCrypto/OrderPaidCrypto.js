import React, { Component } from 'react';
import _ from 'lodash';
import getBlockchainUrl from 'Utils/getBlockchainUrl';
import OrderLinks from '../OrderLinks/OrderLinks';
import OrderCheckIcon from '../OrderIcons/OrderCheckIcon/OrderCheckIcon';
import OrderStateLoader from '../OrderIcons/OrderStateLoader/OrderStateLoader';
import styles from '../OrderState.scss';

class OrderPaidCrypto extends Component {
  constructor(props) {
    super(props);

    this.coin = this.props.order.pair.quote;
    this.tx = _.find(this.props.order.transactions, { type: 'D' });
    this.txId = this.tx.tx_id;
  }

  render() {
    if (this.txId === '' || this.txId === null) {
      return (
        <div className={styles.container}>
          <OrderStateLoader />
          <h2>Processing withdrawal...</h2>
          <OrderLinks {...this.props} />
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <OrderCheckIcon />
        <h2 className={styles.title}>Funds received</h2>
        <h3 className={styles.subtitle}>We are now preparing to release your coins</h3>
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

export default OrderPaidCrypto;
