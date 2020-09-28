import React from 'react';
import { I18n } from 'react-i18next';

const OrderRefundInitiated = () => (
  <I18n ns="translations">
    {t => (
      <div id="order-failure" className="text-center">
        <h2>Order Refund Initiated</h2>
        <h5>We are processing your refund. Please note that refunds can take several days to complete.</h5>
      </div>
    )}
  </I18n>
);

export default OrderRefundInitiated;
