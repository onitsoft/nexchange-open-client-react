import React from 'react';
import moment from 'moment';
import config from '../config';


const OrderPayment = (props) => {
	let coin = props.order.pair.quote,
		coinName = coin.code,
		minConfirmations = coin.min_confirmations,
		tx = props.order.transactions[0],
		txId = tx.tx_id,
		confirmationWaitTime,
		allConfirmationsWaitTime,
		blockchainUrl,
		estimate;

	if (coinName == 'BTC') confirmationWaitTime = 10;
	else if (coinName == 'LTC') confirmationWaitTime = 2.5; // 2.5mins
	else if (coinName == 'ETH') confirmationWaitTime = 0.2; // ETH, 0.2mins

	allConfirmationsWaitTime = confirmationWaitTime * minConfirmations;

	if (coinName == 'ETH') blockchainUrl = `https://etherscan.io/tx/${txId}`;
	else if (coinName == 'LTC') blockchainUrl = `https://live.blockcypher.com/ltc/tx/${txId}/`;
	else if (coinName == 'BTC') blockchainUrl = `https://live.blockcypher.com/btc/tx/${txId}/`;

	estimate = allConfirmationsWaitTime - (allConfirmationsWaitTime * (tx.confirmations/minConfirmations));

	return (
		<div id="order-payment-confirmations" className="col-xs-12 text-center">
			<h2 style={{margin: "0"}}>Awaiting Confirmations ({tx.confirmations}/{minConfirmations})</h2>
			<h5>Transaction ID: <a href={blockchainUrl} target="_blank" style={{color: "#2cb4a0"}}>{tx.tx_id}</a></h5>
			<h5>By our estimations it will take another {parseInt(estimate)} minutes to get all confirmations.</h5>

			<a href={`${config.API_BASE_URL}/orders/${props.orderRef}?format=json`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
			<a href={blockchainUrl} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>See your order details on blockchain</h4></a>
		</div>
	)
};

export default OrderPayment;
