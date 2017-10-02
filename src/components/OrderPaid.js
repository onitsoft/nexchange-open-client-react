import React, { Component } from 'react';
import helpers from '../helpers';
import config from '../config';
import _ from 'lodash';


class OrderPaid extends Component {
	constructor(props) {
		super(props);

		this.coin = this.props.order.pair.quote;
		this.tx = _.find(this.props.order.transactions, {type: 'D'});
		this.txId = this.tx.tx_id;
	}

	render() {
				if (this.txId == '' || this.txId == null) {
			return (
				<div className="col-xs-12 text-center order-status-section">
					<h2 style={{margin: "0"}}>Ödeme gerçekleştiriliyor...</h2>
				</div>
			)
		}

		return (
			<div id="order-paid" className="col-xs-12 text-center">
				<h2 style={{margin: "0"}}>Ödemeniz alındı</h2>
				<h5>Şu anda paranızı göndermeye hazırlanıyoruz</h5>
				<h5>Transaction ID: <span style={{color: "#2cb4a0"}}>{this.props.order.transactions[1].tx_id}</span></h5>

				<a href={helpers.getBlockchainUrl(this.coin.code, this.txId)} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>İşeminizi blok zincirde inceleyebilirsiniz.</h4></a>
			</div> 
		)
	}
	
};

export default OrderPaid;
