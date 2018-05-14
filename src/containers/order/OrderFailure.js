import React from 'react';
import config from '../../config';
import OrderLinks from './OrderLinks';

const OrderFailure = props => (
  <div id="order-failure" className="col-xs-12 text-center">
    <h2>Order Processing Failed</h2>
    <h5>
      There’s been a problem with your order. Please contact support to resolve
      at <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}.</a>
    </h5>

    <OrderLinks {...props} />
  </div>
);

export default OrderFailure;
