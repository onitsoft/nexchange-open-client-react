import React from 'react';
import { Link } from 'react-router-dom';
import OrderLinks from './OrderLinks';

const OrderSuccess = props => (
  <div id="order-success" className="col-xs-12 text-center">
    <h2>Order success</h2>
    <h5>
      <Link to="/" className="text-green">
        Make Another Order!
      </Link>
    </h5>

    <OrderLinks {...props} />
  </div>
);

export default OrderSuccess;
