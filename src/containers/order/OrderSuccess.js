import React from 'react';
import { Link } from 'react-router-dom';
import OrderLinks from './OrderLinks';
import { I18n } from 'react-i18next';

const OrderSuccess = props => (
 <I18n ns="translations">
  {(t) => (
  <div id="order-success" className="col-xs-12 text-center">
    <h2>{t('order.success1')}</h2>
    <h5>
      <Link to="/" className="text-green">
        {t('order.success2')}
      </Link>
    </h5>

    <OrderLinks {...props} />
  </div>
  )}
 </I18n>
);

export default OrderSuccess;
