import React, { Component } from 'react';
import OrderAlert from '../OrderIcons/OrderAlert/OrderAlert';
import { I18n, Trans } from 'react-i18next';
import styles from '../OrderState.scss';

class OrderExpired extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <OrderAlert />
            <h2 className={styles.title}>{t('order.expired1')}</h2>

            <Trans i18nKey="order.expired2">
              <h3 className={styles.subtitle}>
                Your order is expired. You can make a{' '}
                <a href="/" className={styles['new-order-link']}>
                  new exchange order
                </a>.
              </h3>
            </Trans>

            <h4 className={styles.warning} data-toggle="tooltip" data-placement="top" data-original-title={t('order.expired3')}>
              {t('order.expired4')}
            </h4>
          </div>
        )}
      </I18n>
    );
  }
}

export default OrderExpired;
