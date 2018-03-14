import React, { Component } from 'react';
import helpers from '../../helpers';
import config from '../../config';
import _ from 'lodash';


class OrderReleased extends Component {
	constructor(props) {
		super(props);

		this.coin = props.order.pair.base;
		this.minConfirmations = this.coin.min_confirmations;
		this.tx = _.find(props.order.transactions, {type: 'W'});
		this.txId = this.tx.tx_id;
	}

	componentWillReceiveProps(nextProps) {
		this.tx = _.find(nextProps.order.transactions, {type: 'W'});
		this.txId = this.tx.tx_id;
	}

	render() {
		if (this.txId == '' || this.txId == null) {
			return (
				<div className="col-xs-12 text-center order-status-section">
					<h2 style={{margin: "0"}}>Processing withdrawal...</h2>
					<a href={`${config.API_BASE_URL}/orders/${this.props.match.params.orderRef}`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
				</div>
			)
		}

		return (
			<div className="col-xs-12 text-center order-status-section">
				<h2 style={{margin: "0"}}>Funds released, awaiting confirmations ({this.tx.confirmations}/{this.minConfirmations})</h2>
				<h5>Transaction ID: <a href={helpers.getBlockchainUrl(this.coin.code, this.txId)} target="_blank" className="text-green">{this.txId}</a></h5>

				<a href={`${config.API_BASE_URL}/orders/${this.props.match.params.orderRef}`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>See your order details on our API</h4></a>
				<a href={helpers.getBlockchainUrl(this.coin.code, this.txId)} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>See your order details on blockchain</h4></a>
			</div>
		)
	}

};

export default OrderReleased;
