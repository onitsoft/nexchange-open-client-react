import React from 'react';
import config from '../config';


const OrderPaid = (props) => {
	return (
		<div id="order-paid" className="col-xs-12 text-center">
			<h2 style={{margin: "0"}}>Order Paid</h2>
			<h5>We are now sending you your coins</h5>
			<h5>Transaction ID: <span style={{color: "#2cb4a0"}}>{props.order.transactions[1].tx_id}</span></h5>

			<a href={`${config.API_BASE_URL}/orders/${props.orderRef}?format=json`} target="_blank"><h4 style={{margin: "25px 0 18px", "fontWeight": "500"}}>See your order details on our API</h4></a>
		</div>
	)
};

export default OrderPaid;
