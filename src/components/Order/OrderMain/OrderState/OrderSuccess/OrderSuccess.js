import React from 'react';
import { Link } from 'react-router-dom';
import OrderLinks from '../OrderLinks/OrderLinks';
import OrderCheckIcon from '../OrderIcons/OrderCheckIcon/OrderCheckIcon';
import styles from '../OrderState.scss';
import { I18n } from 'react-i18next';

const OrderSuccess = props => (
  <I18n ns="translations">
    {t => (
      <div className={styles.container}>
        <OrderCheckIcon />
        <h2 className={styles.title}>{t('order.success1')}</h2>
        <Link to="/" className={styles['another-order']}>
          {t('order.success2')}
        </Link>

        <OrderLinks {...props} />
      </div>
    )}
  </I18n>
);

export default OrderSuccess;
