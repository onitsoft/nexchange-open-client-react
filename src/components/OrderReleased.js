import React, { Component } from 'react';
import moment from 'moment';
import config from '../config';

import CountDown from './CountDown';


class OrderReleased extends Component {
	constructor(props) {
		super(props);

		this.state = {estimate: 0};

		this.estimateCountdown = this.estimateCountdown.bind(this);

		this.coin = props.order.pair.base;
		this.minConfirmations = this.coin.min_confirmations;
		this.tx = props.order.transactions[0];
		this.txId = this.tx.tx_id;

		if (this.coin.code == 'ETH') this.blockchainUrl = `https://etherscan.io/tx/${this.txId}`;
		else if (this.coin.code == 'LTC') this.blockchainUrl = `https://live.blockcypher.com/ltc/tx/${this.txId}/`;
		else if (this.coin.code == 'BTC') this.blockchainUrl = `https://live.blockcypher.com/btc/tx/${this.txId}/`;
	}

	componentDidMount() {
		if (localStorage.getItem(`funds-released-${this.props.order.unique_reference}`) == null)
			localStorage.setItem(`funds-released-${this.props.order.unique_reference}`, moment().toISOString());

		this.screenFirstSeen = new moment(localStorage.getItem(`funds-released-${this.props.order.unique_reference}`));
		this.estimateCountdown(this.props);
	}

	componentDidMount() {
		this.estimateCountdown(this.props);
	}

	estimateCountdown() {
		let confirmationWaitTime;
		if (this.coin.code == 'BTC') confirmationWaitTime = 600000;
		else if (this.coin.code == 'LTC') confirmationWaitTime = 150000; // 2.5mins
		else if (this.coin.code == 'ETH') confirmationWaitTime = 60000; // ETH, 0.2mins

		let allConfirmationsWaitTime = confirmationWaitTime * this.minConfirmations;
		let estimate = allConfirmationsWaitTime - (allConfirmationsWaitTime * (this.tx.confirmations/this.minConfirmations));

		if (this.state.estimate != estimate)
			this.setState({estimate});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.order.transactions[0].confirmations != nextProps.order.transactions[0].confirmations) {
			let coin = props.order.pair.base;
			this.minConfirmations = this.coin.min_confirmations;

			this.estimateCountdown();
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="col-xs-12 text-center order-status-section">
				<h2 style={{margin: "0"}}>Funds released, awaiting confirmations</h2>
				<h5>Transaction ID: <a href={this.blockchainUrl} target="_blank" className="text-green">{this.txId}</a></h5>

				<CountDown
					time={this.state.estimate}
					defaultMsg="Estimated time left for all confirmations:"
					expiredMsg="The transaction should have received the required number of confirmation by now."
				/>

				<a href={`${config.API_BASE_URL}/orders/${this.props.orderRef}?format=json`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
				<a href={this.blockchainUrl} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>See your order details on blockchain</h4></a>
			</div>
		)
	}

};

export default OrderReleased;

// ({this.tx.confirmations}/{this.minConfirmations})
