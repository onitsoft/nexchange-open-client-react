import React from 'react';
import config from '../../config';


const OrderFailure = (props) => (
  <div id="order-failure" className="col-xs-12 text-center">
      <h2 style={{margin: "0"}}>Order Processing Failed</h2>
      <h5>There’s been a problem with your order. Please contact support to resolve at <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL}.</a></h5>

      <a href={`${config.API_BASE_URL}/orders/${props.match.params.orderRef}`} target="_blank"><h4 style={{margin: "25px 0 18px", "fontWeight": "500"}}>See your order details on our API</h4></a>
  </div>
);

export default OrderFailure;
