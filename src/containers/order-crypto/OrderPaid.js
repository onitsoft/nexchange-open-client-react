import React, { Component } from 'react';
import _ from 'lodash';
import getBlockchainUrl from '../../helpers/getBlockchainUrl';
import OrderLinks from '../order/OrderLinks';
import { I18n } from 'react-i18next';

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
	<I18n ns="translations">
	{(t) => (
        <div className="col-xs-12 text-center order-status-section">
          <h2>{t('order.processing')}</h2>
          <OrderLinks {...this.props} />
        </div>
	)}</I18n>
      );
    }

    return (
	<I18n ns="translations">
	{(t) => (
      <div id="order-paid" className="col-xs-12 text-center">
        <h2>{t('order.paid1')}</h2>
        <h5>{t('order.paid2')}</h5>
        <h5>
          {t('order.txid')}:{' '}
          <a href={getBlockchainUrl(this.coin.code, this.txId)} target="_blank" className="text-green">
            {this.txId}
          </a>
        </h5>
        <OrderLinks coin={this.coin.code} txId={this.txId} {...this.props} />
      </div>
	)}</I18n>
    );
  }
}

export default OrderPaid;
