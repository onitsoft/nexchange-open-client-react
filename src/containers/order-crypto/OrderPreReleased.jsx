import React from 'react';
import config from '../../config';


const OrderPreReleased = (props) => (
	<div className="col-xs-12 text-center order-status-section">
		<h2 style={{margin: "0"}}>We are processing your order</h2>
		<h5>Please allow up to 15 minutes.</h5>

		<a href={`${config.API_BASE_URL}/orders/${props.match.params.orderRef}`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
	</div>
);

export default OrderPreReleased;
