import React from 'react';
import { I18n } from 'react-i18next';

import config from 'Config';

const OrderRefundFailed = () => (
  <I18n ns="translations">
    {t => (
      <div id="order-failure" className="text-center">
        <h2>Order Refund Failed</h2>
        <h5>
          Something went wrong while processing your refund. Please contact support at
          <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}</a> for more information.
        </h5>
      </div>
    )}
  </I18n>
);

export default OrderRefundFailed;
