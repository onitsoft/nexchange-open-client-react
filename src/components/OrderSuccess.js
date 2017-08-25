import React from 'react';
import config from '../config';

const OrderSuccess = (props) => (
  <div id="order-success" className="col-xs-12 text-center">
      <h2 style={{margin: "0"}}>Order Success</h2>
      <h5>You can go back to home page and do another order.</h5>

      <a href={`${config.API_BASE_URL}/orders/${props.orderRef}?format=json`} target="_blank"><h4 style={{margin: "25px 0 18px", "fontWeight": "500"}}>See your order details</h4></a>
  </div>
);

export default OrderSuccess;
