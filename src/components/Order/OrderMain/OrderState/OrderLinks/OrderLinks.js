import React from 'react';
import config from 'Config';
import getBlockchainUrl from 'Utils/getBlockchainUrl';
import styles from './OrderLinks.scss';

const OrderLinks = props => (
  <div className={styles.links}>
    {props.order && (
      <a href={`${config.API_BASE_URL}/orders/${props.order.unique_reference}`} className={`btn ${styles.btn}`} target="_blank">
        See your order details on our API
      </a>
    )}

    {props.coin &&
      props.txId && (
        <a href={getBlockchainUrl(props.coin, props.txId)} className={`btn ${styles.btn}`} target="_blank">
          See your order details on blockchain
        </a>
      )}
  </div>
);

export default OrderLinks;
