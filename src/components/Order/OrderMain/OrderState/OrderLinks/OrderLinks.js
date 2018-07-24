import React from 'react';
import config from 'Config';
import getBlockchainUrl from 'Utils/getBlockchainUrl';
import styles from './OrderLinks.scss';
import { I18n } from 'react-i18next';

const OrderLinks = props => (
  <I18n ns="translations">
    {t => (
      <div className={styles.links}>
        {props.order && (
          <a href={`${config.API_BASE_URL}/orders/${props.order.unique_reference}`} className={`btn ${styles.btn}`} target="_blank">
            {t('order.api')}
          </a>
        )}

        {props.coin &&
          props.txId && (
            <a href={getBlockchainUrl(props.coin, props.txId)} className={`btn ${styles.btn}`} target="_blank">
              {t('order.blockchain')}
            </a>
          )}
      </div>
    )}
  </I18n>
);

export default OrderLinks;
