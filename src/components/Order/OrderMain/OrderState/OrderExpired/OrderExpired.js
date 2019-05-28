import React, { Component } from 'react';
import OrderAlert from '../OrderIcons/OrderAlert/OrderAlert';
import { I18n } from 'react-i18next';
import styles from '../OrderState.scss';


class OrderExpired extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    const props = this.props;

    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <OrderAlert />
            <h2 className={styles.title}>{t('order.expired1')}</h2>

            {/*<Trans i18nKey="order.expired2">
              <h3 className={styles.subtitle}>
                Your order is expired. You can make a{' '}
                <a href="/" className={styles['new-order-link']}>
                  new exchange order
                </a>.
              </h3>
            </Trans>*/}

            <h4 className={styles.warning} data-toggle="tooltip" data-placement="top" data-original-title={t('order.expired3')}>
              {t('order.expired4')}
            </h4>

            {props.order && (
              <a href={`/?pair=${props.order.pair.name}&amount_quote=${props.order.amount_quote}`+
              `&withdraw_address=${props.order.withdraw_address.address}`}
              className={`btn ${styles.btn}`} target="_blank" rel="noopener noreferrer">
                {t('order.repeat')}
              </a>)
            }

          </div>
        )}
      </I18n>
    );
  }
}

export default OrderExpired;
