import React from 'react';
import OrderLinks from '../OrderLinks/OrderLinks';
import styles from '../OrderState.scss';

const OrderPreReleased = props => (
  <div className={styles.container}>
    <h2 className={styles.title}>We are processing your order</h2>
    <h3 className={styles.subtitle}>Please allow for up to 15 minutes.</h3>

    <OrderLinks {...props} />
  </div>
);

export default OrderPreReleased;
