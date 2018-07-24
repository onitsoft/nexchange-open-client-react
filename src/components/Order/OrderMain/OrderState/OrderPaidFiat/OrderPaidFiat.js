import React from 'react';
import OrderStateLoader from '../OrderIcons/OrderStateLoader/OrderStateLoader';
import { I18n } from 'react-i18next';
import styles from '../OrderState.scss';

const OrderPaid = () => (
  <I18n ns="translations">
    {t => (
      <div className={styles.container}>
        <OrderStateLoader />
        <h2 className={styles.title}>{t('order.fiat.status.paid')}</h2>
        <h3 className={styles.subtitle}>{t('order.paid2')}</h3>
      </div>
    )}
  </I18n>
);

export default OrderPaid;
