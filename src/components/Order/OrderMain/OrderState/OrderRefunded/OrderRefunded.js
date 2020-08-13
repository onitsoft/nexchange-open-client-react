import React from 'react';
import { I18n, Trans } from 'react-i18next';

import OrderLinks from '../OrderLinks/OrderLinks';
import config from 'Config';

const OrderRefunded = props => (
  <I18n ns="translations">
    {t => (
      <div id="order-failure" className="text-center">
        <h2>{t('refund.9')}</h2>

        <Trans i18nKey="refund.10">
          <h5>
            Your order has been refunded. Please contact support at
            <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}</a> for more information.
          </h5>
        </Trans>

        <OrderLinks {...props} />
      </div>
    )}
  </I18n>
);

export default OrderRefunded;
