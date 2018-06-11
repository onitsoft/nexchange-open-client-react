import React from 'react';
import OrderLinks from './OrderLinks';
import { I18n } from 'react-i18next';

const OrderPreReleased = props => (
 <I18n ns="translations">
  {(t) => (
  <div className="col-xs-12 text-center order-status-section">
    <h2>{i18n.t('order.pre1')}</h2>
    <h5>{i18n.t('order.pre2')}</h5>

    <OrderLinks {...props} />
  </div>
  )}
 </I18n>
);

export default OrderPreReleased;
