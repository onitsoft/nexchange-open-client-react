import React from 'react';
import styles from '../OrderState.scss';

const OrderPaid = () => (
  <div className={styles.container}>
    <h2 className={styles.title}>Payment & verification received</h2>
    <h3 className={styles.subtitle}>We are now preparing to release your coins</h3>
  </div>
);

export default OrderPaid;
