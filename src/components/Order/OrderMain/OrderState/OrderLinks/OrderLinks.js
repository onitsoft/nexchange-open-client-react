import React from 'react';
// import getBlockchainUrl from 'Utils/getBlockchainUrl';
import styles from './OrderLinks.scss';
import { I18n } from 'react-i18next';

import { STATUS_CODES } from 'StatusCodes';

const OrderLinks = props => (
  <I18n ns="translations">
    {t => (
      <div className={styles.links}>
        {props.order && STATUS_CODES[props.order.status_name[0][0]] === "COMPLETED" && (
          <a href={`/?pair=${props.order.pair.name}&amount_quote=${props.order.amount_quote}`+
          `&withdraw_address=${props.order.withdraw_address.address}`}
          className={`btn ${styles.btn}`} target="_blank" rel="noopener noreferrer">
            {t('order.repeat')}
          </a>)
        }
        {/* {props.coin &&
          props.txId && (
            <a href={getBlockchainUrl(props.coin, props.txId)} className={`btn ${styles.btn}`} target="_blank">
              {t('order.blockchain')}
            </a>
          )} */}
      </div>
    )}
  </I18n>
);

export default OrderLinks;
