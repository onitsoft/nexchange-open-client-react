import React, { Component } from 'react';
import moment from 'moment';
import config from '../config';


class OrderReleased extends Component {
	constructor(props) {
		super(props);

		this.state = {
			countdown: '...'
		}

		this.estimateCountdown = this.estimateCountdown.bind(this);
		this.setVariables = this.setVariables.bind(this);

		this.setVariables(props);
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState({
				countdown: this.state.countdown - 1000
			})
		}, 1000);

		this.estimateCountdown(this.props);
	}

	setVariables(props) {
		this.coin = props.order.pair.base;
		this.coinName = this.coin.code;
		this.minConfirmations = this.coin.min_confirmations;
		this.tx = props.order.transactions[1];
		this.txId = this.tx.tx_id;

		if (this.coinName == 'BTC') this.confirmationWaitTime = 600000;
		else if (this.coinName == 'LTC') this.confirmationWaitTime = 150000; // 2.5mins
		else if (this.coinName == 'ETH') this.confirmationWaitTime = 60000; // ETH, 0.2mins

		this.allConfirmationsWaitTime = this.confirmationWaitTime * this.minConfirmations;

		if (this.coinName == 'ETH') this.blockchainUrl = `https://etherscan.io/tx/${this.txId}`;
		else if (this.coinName == 'LTC') this.blockchainUrl = `https://live.blockcypher.com/ltc/tx/${this.txId}/`;
		else if (this.coinName == 'BTC') this.blockchainUrl = `https://live.blockcypher.com/btc/tx/${this.txId}/`;
	}

	estimateCountdown(props) {
		let estimate = this.allConfirmationsWaitTime - (this.allConfirmationsWaitTime * (this.tx.confirmations/this.minConfirmations));

		this.setState({
			countdown: estimate
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setVariables(nextProps);
		this.estimateCountdown(nextProps);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="col-xs-12 text-center order-status-section">
				<h2 style={{margin: "0"}}>Funds released, awaiting confirmations ({this.tx.confirmations}/{this.minConfirmations})</h2>
				<h5>Transaction ID: <a href={this.blockchainUrl} target="_blank" className="text-green">{this.txId}</a></h5>

				{this.state.countdown >= 0 ? (
					<h5>Estimated time left until all confirmations: <b className="text-green">{moment.utc(this.state.countdown).format('mm:ss')}</b></h5>
				) : (
					<h5>The transaction should have gotten the required number of confirmation by now.</h5>					
				)}

				<a href={`${config.API_BASE_URL}/orders/${this.props.orderRef}?format=json`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
				<a href={this.blockchainUrl} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>See your order details on blockchain</h4></a>
			</div>
		)
	}

};

export default OrderReleased;
