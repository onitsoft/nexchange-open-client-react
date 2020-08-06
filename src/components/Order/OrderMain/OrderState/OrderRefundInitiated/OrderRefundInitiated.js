import React from 'react';
import config from 'Config';
import { I18n, Trans } from 'react-i18next';

const OrderRefundInitiated = () => (
  <I18n ns="translations">
    {t => (
      <div id="order-failure" className="text-center">
        <h2>Order Refund Initiated</h2>

        <Trans i18nKey="refund.10">
          <h5>
            We are processing your refund. Please allow us upto 15 minutes. Please contact support at
            <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}</a> for more information.
          </h5>
        </Trans>
      </div>
    )}
  </I18n>
);

export default OrderRefundInitiated;
