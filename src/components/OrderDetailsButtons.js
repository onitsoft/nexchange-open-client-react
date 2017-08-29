import React from 'react';
import moment from 'moment';
import config from '../config';


const OrderDetailsButtons = (props) => {






	let	estimate = wait - (wait * (props.order.transactions[0].confirmations/requiredConfirmations));
	let transId = props.order.transactions[0].tx_id;

	let blockchainUrl;
	if (coin == 'ETH') {
		blockchainUrl = `https://etherscan.io/tx/${transId}`;
	} else if (coin == 'LTC') {
		blockchainUrl = `https://live.blockcypher.com/ltc/tx/${transId}/`;
	} else if (coin == 'BTC') {
		blockchainUrl = `https://live.blockcypher.com/btc/tx/${transId}/`;
	}

	return (
		<div className="col-xs-12 text-center">
			<a href={`${config.API_BASE_URL}/orders/${props.orderRef}?format=json`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
			<a href={blockchainUrl} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>See your order details on blockchain</h4></a>
		</div>
	)
};

export default OrderDetailsButtons;
