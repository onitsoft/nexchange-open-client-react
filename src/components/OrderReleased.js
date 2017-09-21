import React, { Component } from 'react';
import helpers from '../helpers';
import config from '../config';
import _ from 'lodash';


class OrderReleased extends Component {
	constructor(props) {
		super(props);

		this.coin = props.order.pair.base;
		this.minConfirmations = this.coin.min_confirmations;
		this.tx = _.find(props.order.transactions, {type: 'W'});
		this.txId = this.tx.tx_id;

		if (this.coin.code == 'ETH') this.blockchainUrl = `https://etherscan.io/tx/${this.txId}`;
		else if (this.coin.code == 'LTC') this.blockchainUrl = `https://live.blockcypher.com/ltc/tx/${this.txId}/`;
		else if (this.coin.code == 'BTC') this.blockchainUrl = `https://blockchain.info/tx/${this.txId}`;
	}

	componentWillReceiveProps(nextProps) {
		if (_.find(this.props.order.transactions, {type: 'W'}).confirmations != _.find(nextProps.order, {type: 'W'}).confirmations) {
			let coin = nextProps.order.pair.base;
			this.minConfirmations = this.coin.min_confirmations;

		}
	}

	render() {
		if (this.txId == '' || this.txId == null) {
			return (
				<div className="col-xs-12 text-center order-status-section">
					<h2 style={{margin: "0"}}>Processing withdrawal...</h2>
		
					<a href={`${config.API_BASE_URL}/orders/${this.props.orderRef}`} target="_blank"><h4 style={{margin: "25px 0 0px", "fontWeight": "500"}}>İşlem detaylarınızı inceleyebilirsiniz</h4></a>
				</div>
			)
		}

		return (
			<div className="col-xs-12 text-center order-status-section">
				<h2 style={{margin: "0"}}>Paranız gönderildi, onaylar bekleniyor</h2>
				<h5>Transaction ID: <a href={this.blockchainUrl} target="_blank" className="text-green">{this.txId}</a></h5>

				</div>
		)
	}

};

export default OrderReleased;