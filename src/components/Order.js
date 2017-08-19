import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';

import config from '../config';

import OrderStatus from './OrderStatus';


import { Container } from 'react-bootstrap';

class Order extends Component {

	constructor(props) {
		super();

		this.state = {
			copied: false,
			createdOn: '...',
			timeRemaining: '...',
			depositAmount: '...',
			depositCoin: '...',
			depositAddress: '...',
			receiveAmount: '...',
			receiveCoin: '...',
			receiveAddress: '...',
			orderStatus: 1,
			timerClassName: 'success'
		};

		this.getOrderDetails = this.getOrderDetails.bind(this);
		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.interval = setInterval(this.tick, 1000);
		this.tick();
		this.getOrderDetails();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	tick() {
		if (this.state.createdOn == '...') return;

		let now = moment().subtract(15, 'minutes');
		let createdOn = moment(this.state.createdOn);
		let diff = createdOn.diff(now);

		if (diff < 100000)
			this.setState({timerClassName: 'danger'});
		else if (diff < 362930)
			this.setState({timerClassName: 'warning'});

		if (diff < 0)
			diff = 'ORDER EXPIRED'
		else
			diff = moment.utc(diff).format('mm:ss')

		this.setState({
			timeRemaining: diff
		});
	}

	getOrderDetails() {
		axios.get(`${config.API_BASE_URL}/orders/${this.props.match.params.orderRef}`)
			.then((response) => {
				let data = response.data;

				this.setState({
					depositAmount: parseFloat(data.amount_quote),
					depositCoin: data.deposit_address.currency_code,
					depositAddress: data.deposit_address.address,
					receiveAmount: parseFloat(data.amount_base),
					receiveCoin: data.withdraw_address.currency_code,
					receiveAddress: data.withdraw_address.address,
					createdOn: data.created_on,
					orderStatus: data.status_name[0][0]
				})
			})
			.catch((error) => {
				console.log(error);
			});
	}

	triggerCopyTooltip() {
		$('#copy-to-clipboard').tooltip({
			trigger: 'click',
			placement: 'top'
		});

		$('#copy-to-clipboard').tooltip('hide')
			.attr('data-original-title', 'Wallet address copied!')
			.tooltip('show');

		setTimeout(() => {
			$('#copy-to-clipboard').tooltip('destroy');
		}, 1000);
	}

	render() {
		return (
			<div id="order">
				<div className="container">
					<div className="row">
					    <div className="col-xs-12">
					    	<h3 id="order-ref">Order Reference: <b>{this.props.match.params.orderRef}</b></h3>
					    </div>
					</div>

					<div className="row">
					    <div className="col-xs-12 col-sm-6">
					    	<div className="box media">
					    		<div className="media-left">
					    			<i className={`coin-icon ${this.state.depositCoin}`}></i>
					    		</div>

					    		<div className="media-body">
						    		<h5><b>Deposit {this.state.depositAmount} {this.state.depositCoin}</b></h5>
						    		<h6>{this.state.depositAddress}</h6>
					    		</div>
					    	</div>
					    </div>

					    <div className="col-xs-12 col-sm-6">
					    	<div className="box media">
					    		<div className="media-left">
					    			<i className={`coin-icon ${this.state.receiveCoin}`}></i>
					    		</div>

					    		<div className="media-body">
						    		<h5><b>Receive {this.state.receiveAmount} {this.state.receiveCoin}</b></h5>
						    		<h6>{this.state.receiveAddress}</h6>
					    		</div>
					    	</div>
					    </div>

					    <div id="order-payment" className="col-xs-12">
					    	<div className="box">
					    		<div className="row">
					    			<div className="col-xs-12 col-sm-3">
					    				<img src="https://chart.googleapis.com/chart?chs=250x250&chld=L|2&cht=qr&chl=bitcoin:1KTFHHwtdNmGrbY5MfWhtswpG9tuxZwwoA?amount=0.0363" />
					    			</div>

					    			<div id="order-payment-details" className="col-xs-12 col-sm-9">
					    				<h3>Time remaining: <span className="text-success"><b>{this.state.timeRemaining}</b></span></h3>

					    				<h4>Send <b>{this.state.depositAmount} {this.state.depositCoin}</b> to the address<br/>
					    					<b id="deposit-address">{this.state.depositAddress}</b>
					    				</h4>

								        <CopyToClipboard text={this.state.depositAddress}
								          onCopy={() => this.triggerCopyTooltip()}>
											<button id="copy-to-clipboard" type="button" className="btn btn-default">
												Copy the address
											</button>
					    				</CopyToClipboard>
					    			</div>
					    		</div>

					    		<div className="row">
					    			<div className="col-xs-12">
						    			<OrderStatus status={this.state.orderStatus} />
					    			</div>
					    		</div>
					    	</div>
					    </div>
					</div>
				</div>
			</div>
		);
	}
}

export default Order;