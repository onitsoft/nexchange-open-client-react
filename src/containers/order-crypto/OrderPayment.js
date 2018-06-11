import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import config from '../../config';
import _ from 'lodash';
import getBlockchainUrl from '../../helpers/getBlockchainUrl';
import OrderLinks from '../order/OrderLinks';

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
	  <I18n ns="translations">
		{(t) => (
        <div className="col-xs-12 text-center order-status-section">
          <h2>{t('order.payment1')}</h2>
          <a
            href={`${config.API_BASE_URL}/orders/${
              this.props.order.unique_reference
            }`}
            target="_blank"
          >
            <h4 style={{ margin: '25px 0 0px', fontWeight: '500' }}>
              {t('order.details')}
            </h4>
          </a>
        </div>
		)}</I18n>
      );
    }

    return (
	  <I18n ns="translations">
		{(t) => (
      <div className="col-xs-12 text-center order-status-section">
        <h2>
          {t('order.payment2')} ({this.tx.confirmations}/{
            this.minConfirmations
          })
        </h2>
        <h5>
          Transaction ID:{' '}
          <a
            href={getBlockchainUrl(this.coin.code, this.txId)}
            target="_blank"
            style={{ color: '#2cb4a0' }}
          >
            {this.tx.tx_id}
          </a>
        </h5>

        <OrderLinks coin={this.coin.code} txId={this.txId} {...this.props} />
      </div>
	)}</I18n>
    );
  }
}

export default OrderPayment;
