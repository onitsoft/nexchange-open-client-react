import React from 'react';
import OrderCoinProcessed from './OrderCoinProcessed/OrderCoinProcessed';
import styles from './OrderCoinsProcessed.scss';
import ArrowRight from './images/arrow-right.svg';

const OrderCoinsProcessed = props => {
  return (
    <div>
      <OrderCoinProcessed type="Deposit" order={props.order} />
      <div className={`${styles.container} hidden-xs hidden-sm`}>
        <ArrowRight className={styles.arrow} />
      </div>
      <OrderCoinProcessed type="Receive" order={props.order} />
    </div>
  );
};

export default OrderCoinsProcessed;
