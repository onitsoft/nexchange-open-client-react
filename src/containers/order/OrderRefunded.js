import React from 'react';
import config from '../../config';
import OrderLinks from './OrderLinks';
import { I18n } from 'react-i18next';

const OrderRefunded = props => (
 <I18n ns="translations">
  {(t) => (
  <div id="order-failure" className="col-xs-12 text-center">
    <h2>{t('refund.12')}</h2>
    <h5>
      {('order.refund')}{' '}
      <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}</a>.
    </h5>

    <OrderLinks {...props} />
  </div>
  )}
 </I18n>
);

export default OrderRefunded;
