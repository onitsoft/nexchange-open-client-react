import React, { Component } from 'react';
import styles from '../OrderState.scss';

class OrderExpired extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Order Expired</h2>
        <h3 className={styles.subtitle}>Your order is expired. You can make a new exchange order.</h3>

        <h4
          className={styles.warning}
          data-toggle="tooltip"
          data-placement="top"
          data-original-title="
						If you have already sent your coins, don’t worry.
						Once we get them, the status of the order will be updated retroactively."
        >
          Already sent?
        </h4>
      </div>
    );
  }
}

export default OrderExpired;
