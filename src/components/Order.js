import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';

import config from '../config';

import OrderStatus from './OrderStatus';

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
			receiveAddress: '...'

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

				console.log(data);

				this.setState({
					depositAmount: parseFloat(data.amount_base),
					depositCoin: data.deposit_address.currency_code,
					depositAddress: data.deposit_address.address,
					receiveAmount: parseFloat(data.amount_quote),
					receiveCoin: data.withdraw_address.currency_code,
					receiveAddress: data.withdraw_address.address,
					createdOn: data.created_on
				})
			})
			.catch((error) => {
				console.log(error);
			});
	}

	triggerCopyTooltip() {
		this.setState({copied: true});
		setTimeout(() => this.setState({copied: false}), 1000)
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
					    			<i className={`coin-icon BTC`}></i>
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
					    			<i className={`coin-icon ETH`}></i>
					    		</div>

					    		<div className="media-body">
						    		<h5><b>Receive {this.state.receiveAmount} {this.state.receiveCoin} </b></h5>
						    		<h6>{this.state.receiveAddress}</h6>
					    		</div>
					    	</div>
					    </div>

					    <div className="col-xs-12">
					    	<div className="box">
					    		<div className="row">
					    			<div className="col-xs-12 col-sm-3">
					    				<img src="https://chart.googleapis.com/chart?chs=250x250&chld=L|2&cht=qr&chl=bitcoin:1KTFHHwtdNmGrbY5MfWhtswpG9tuxZwwoA?amount=0.0363" />
					    			</div>

					    			<div className="col-xs-12 col-sm-9">
					    				<h3 className="text-success">Time remaining: {this.state.timeRemaining}</h3>

					    				<h4>Send <b>{this.state.depositAmount} {this.state.depositCoin}</b> to the address<br/>
					    					<b id="deposit-address">{this.state.depositAddress}</b>
					    				</h4>

								        <CopyToClipboard text={this.state.address}
								          onCopy={() => this.triggerCopyTooltip()}>
											<button id="copyToClipboard" type="button" className="btn btn-default">
												<div className={this.state.copied ? "tooltip top in" : "tooltip"} role="tooltip">
													<div className="tooltip-arrow"></div>
													<div className="tooltip-inner">Adddress copied!</div>
												</div>
												Copy the address
											</button>
					    				</CopyToClipboard>
					    			</div>

					    			
					    		</div>

					    		<div className="row">
					    			<div className="col-xs-12">
						    			<OrderStatus />
					    			</div>
					    		</div>

					    		
					    	</div>
					    </div>
					</div>

					<div className="row">
					    <div className="col-xs-12">

					    </div>
					</div>
				</div>
			</div>
		);
	}
}

export default Order;
