import React from 'react';
import config from '../../config';


const OrderRefunded = (props) => (
  <div id="order-failure" className="col-xs-12 text-center">
      <h2 style={{margin: "0"}}>Order Refunded</h2>
      <h5>Your order has been refunded. Please contact support at <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}</a> for more information.</h5>

      <a href={`${config.API_BASE_URL}/orders/${props.match.params.orderRef}`} target="_blank"><h4 style={{margin: "25px 0 18px", "fontWeight": "500"}}>See your order details on our API</h4></a>
  </div>
);

export default OrderRefunded;
