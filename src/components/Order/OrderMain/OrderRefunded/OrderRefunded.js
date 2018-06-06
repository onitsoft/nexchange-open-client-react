import React from 'react';
import config from 'Config';
import OrderLinks from '../OrderLinks/OrderLinks';

const OrderRefunded = props => (
  <div id="order-failure" className="col-xs-12 text-center">
    <h2>Order Refunded</h2>
    <h5>
      Your order has been refunded. Please contact support at <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}</a> for more
      information.
    </h5>

    <OrderLinks {...props} />
  </div>
);

export default OrderRefunded;
