import React from 'react';
import { I18n } from 'react-i18next';

const OrderPaid = () => (
  <I18n ns="translations">
  {(t) => (
  <div id="order-paid" className="col-xs-12 text-center order-status-section">
    <h2>{t('order.fiat.status.paid')}</h2>
    <h5>{t('order.paid2')}</h5>
  </div>
  )}</I18n>
);

export default OrderPaid;
