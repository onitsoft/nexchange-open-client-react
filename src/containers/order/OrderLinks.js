import React from 'react';
import config from '../../config';
import getBlockchainUrl from '../../helpers/getBlockchainUrl';
import i18n from '../../i18n';

const OrderLinks = props => (
  <div id="order-links">
    {props.order && (
      <a
        href={`${config.API_BASE_URL}/orders/${props.order.unique_reference}`}
        target="_blank"
      >
        <h4>{i18n.t('recentorders.2')}</h4>
      </a>
    )}

    {props.coin &&
      props.txId && (
        <a href={getBlockchainUrl(props.coin, props.txId)} target="_blank">
          <h4>{i18n.t('order.blockchain')}</h4>
        </a>
      )}
  </div>
);

export default OrderLinks;
