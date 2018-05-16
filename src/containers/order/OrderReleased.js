import React, { Component } from 'react';
import _ from 'lodash';
import getBlockchainUrl from '../../helpers/getBlockchainUrl';
import OrderLinks from './OrderLinks';

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
        <div className="col-xs-12 text-center order-status-section">
          <h2 style={{ margin: '0' }}>Processing withdrawal...</h2>
          <OrderLinks {...this.props} />
        </div>
      );
    }

    return (
      <div className="col-xs-12 text-center order-status-section">
        <h2 style={{ margin: '0' }}>
          Funds released, awaiting confirmations ({this.tx.confirmations}/{
            this.minConfirmations
          })
        </h2>
        <h5>
          Transaction ID:{' '}
          <a
            href={getBlockchainUrl(this.coin.code, this.txId)}
            target="_blank"
            className="text-green"
          >
            {this.txId}
          </a>
        </h5>

        <OrderLinks coin={this.coin.code} txId={this.txId} {...this.props} />
      </div>
    );
  }
}

export default OrderReleased;
