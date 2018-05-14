import React from 'react';
import OrderLinks from './OrderLinks';

const OrderPreReleased = props => (
  <div className="col-xs-12 text-center order-status-section">
    <h2>We are processing your order</h2>
    <h5>Please allow for up to 15 minutes.</h5>

    <OrderLinks {...props} />
  </div>
);

export default OrderPreReleased;
