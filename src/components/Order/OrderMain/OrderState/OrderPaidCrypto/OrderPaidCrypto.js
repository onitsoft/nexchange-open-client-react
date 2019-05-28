import React, { Component } from 'react';
import _ from 'lodash';
import getBlockchainUrl from 'Utils/getBlockchainUrl';
import OrderLinks from '../OrderLinks/OrderLinks';
import OrderCheckIcon from '../OrderIcons/OrderCheckIcon/OrderCheckIcon';
import OrderStateLoader from '../OrderIcons/OrderStateLoader/OrderStateLoader';
import { I18n } from 'react-i18next';
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
        <I18n ns="translations">
          {t => (
            <div className={styles.container}>
              <OrderStateLoader />
              <h2>{t('order.processing')}...</h2>
              <OrderLinks {...this.props} />
            </div>
          )}
        </I18n>
      );
    }

    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <OrderCheckIcon />
            <h2 className={styles.title}>{t('order.paid1')}</h2>
            <h3 className={styles.subtitle}>{t('order.paid2')}</h3>
            <h3 className={styles.subtitle}>
              {t('order.txid')}:{' '}
              <a 
                href={getBlockchainUrl(this.coin.code, this.txId)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green">
                {this.txId}
              </a>
            </h3>
            <OrderLinks coin={this.coin.code} txId={this.txId} {...this.props} />
          </div>
        )}
      </I18n>
    );
  }
}

export default OrderPaidCrypto;
