import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import config from '../config';

import OrderPayment from './OrderPayment';
import OrderStatus from './OrderStatus';
import OrderExpired from './OrderExpired';


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
			timerClassName: 'success',
			orderExpired: false
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

		if (diff < 0) {
			this.setState({orderExpired: true});
			clearInterval(this.interval);
			return;
		} else {
			diff = moment.utc(diff).format('mm:ss')
		}

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


					    <div  className="col-xs-12">
					    	<div className="box">
						    		<div className="row">
								    {this.state.orderExpired ? 
								    	<OrderExpired /> :
								    	<OrderPayment depositCoin={this.state.depositCoin} depositAddress={this.state.depositAddress} timeRemaining={this.state.timeRemaining} timerClassName={this.state.timerClassName} />
								    }
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