import React, { Component } from 'react';
import moment from 'moment';
import config from '../config';
import _ from 'lodash';

import CountDown from './CountDown';


class OrderPayment extends Component {
	constructor(props) {
		super(props);

		this.state = {estimate: 0};

		this.estimateCountdown = this.estimateCountdown.bind(this);

		this.coin = props.order.pair.quote;
		this.minConfirmations = this.coin.min_confirmations;
		this.tx = _.find(props.order.transactions, {type: 'D'});
		this.txId = this.tx.tx_id;

		if (this.coin.code == 'ETH') this.blockchainUrl = `https://etherscan.io/tx/${this.txId}`;
		else if (this.coin.code == 'LTC') this.blockchainUrl = `https://live.blockcypher.com/ltc/tx/${this.txId}/`;
		else if (this.coin.code == 'BTC') this.blockchainUrl = `https://blockchain.info/tx/${this.txId}`;
	}

	componentDidMount() {
		if (localStorage.getItem(`funds-received-${this.props.order.unique_reference}`) == null)
			localStorage.setItem(`funds-received-${this.props.order.unique_reference}`, moment().toISOString());

		this.screenFirstSeen = new moment(localStorage.getItem(`funds-received-${this.props.order.unique_reference}`));
		this.estimateCountdown(this.props);
	}

	estimateCountdown() {
		let confirmationWaitTime;
		if (this.coin.code == 'BTC') confirmationWaitTime = 600000;
		else if (this.coin.code == 'LTC') confirmationWaitTime = 150000; // 2.5mins
		else if (this.coin.code == 'ETH') confirmationWaitTime = 60000; // ETH, 0.2mins

		let diff = new moment().diff(this.screenFirstSeen);

		let allConfirmationsWaitTime = confirmationWaitTime * this.minConfirmations;
		let estimate = allConfirmationsWaitTime - (allConfirmationsWaitTime * (this.tx.confirmations/this.minConfirmations)) - diff;

		if (this.state.estimate != estimate)
			this.setState({estimate});
	}

	componentWillReceiveProps(nextProps) {
		if (_.find(this.props.order.transactions, {type: 'D'}).confirmations != _.find(nextProps.order, {type: 'D'}).confirmations) {
			let coin = nextProps.order.pair.quote;
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
				<h2 style={{margin: "0"}}>Transaction detected, awaiting confirmations</h2>
				<h5>Transaction ID: <a href={this.blockchainUrl} target="_blank" style={{color: "#2cb4a0"}}>{this.tx.tx_id}</a></h5>

				<CountDown
					time={this.state.estimate}
					defaultMsg="Estimated time left for all confirmations:"
					expiredMsg="The transaction should have received the required number of confirmation by now."
					info={<i className="fa fa-question-circle-o" data-toggle="tooltip" data-placement="top" title="" data-original-title="This estimation assumes optimal network fee."></i>}
				/>

				<a href={`${config.API_BASE_URL}/orders/${this.props.orderRef}?format=json`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
				<a href={this.blockchainUrl} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>See your order details on blockchain</h4></a>
			</div>
		)
	}

};

export default OrderPayment;

//  ({this.tx.confirmations}/{this.minConfirmations})
