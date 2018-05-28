import React, { Component } from 'react';
import _ from 'lodash';
import getBlockchainUrl from '../../helpers/getBlockchainUrl';
import OrderLinks from '../order/OrderLinks';

class OrderPaid extends Component {
  constructor(props) {
    super(props);

    this.coin = this.props.order.pair.quote;
    this.tx = _.find(this.props.order.transactions, { type: 'D' });
    this.txId = this.tx.tx_id;
  }

  render() {
    if (this.txId === '' || this.txId === null) {
      return (
        <div className="col-xs-12 text-center order-status-section">
          <h2>Processing withdrawal...</h2>
          <OrderLinks {...this.props} />
        </div>
      );
    }

    return (
      <div id="order-paid" className="col-xs-12 text-center">
        <h2>Funds received</h2>
        <h5>We are now preparing to release your coins</h5>
        <h5>
          Transaction ID:{' '}
          <a href={getBlockchainUrl(this.coin.code, this.txId)} target="_blank" className="text-green">
            {this.txId}
          </a>
        </h5>
        <OrderLinks coin={this.coin.code} txId={this.txId} {...this.props} />
      </div>
    );
  }
}

export default OrderPaid;
