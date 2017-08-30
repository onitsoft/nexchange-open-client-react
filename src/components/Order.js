import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import config from '../config';

import OrderInitial from './OrderInitial';
import OrderPayment from './OrderPayment';
import OrderPaid from './OrderPaid';
import OrderReleased from './OrderReleased';
import OrderSuccess from './OrderSuccess';
import OrderFailure from './OrderFailure';
import OrderExpired from './OrderExpired';
import OrderStatus from './OrderStatus';
import Bookmark from './Bookmark';
import NotFound from './NotFound';


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
			expired: false,
			loading: true,
			paymentWindow: null,
			showBookmarkModal: false,
			notFound: false,
			order: null,
		};

		this.getOrderDetails = this.getOrderDetails.bind(this);
		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.getOrderDetails();
	}

	tick() {
		if (this.state.createdOn == '...') return;

		let now = moment().subtract(this.state.paymentWindow, 'minutes');
		let createdOn = moment(this.state.createdOn);
		let diff = createdOn.diff(now);

		if (diff < 0) {
			this.setState({expired: true});
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
					loading: false,
					depositAmount: parseFloat(data.amount_quote),
					depositCoin: data.deposit_address.currency_code,
					depositAddress: data.deposit_address.address,
					receiveAmount: parseFloat(data.amount_base),
					receiveCoin: data.withdraw_address.currency_code,
					receiveAddress: data.withdraw_address.address,
					createdOn: data.created_on,
					orderStatus: data.status_name[0][0],
					paymentWindow: parseInt(data.payment_window),
					order: data
				}, () => {
					this.interval = setInterval(this.tick, 1000);
					this.tick();
				})
			})
			.catch((error) => {
				console.log(error);
				this.setState({notFound: true})
			});

		this.timeout = setTimeout(() => {
			this.getOrderDetails();
		}, config.ORDER_DETAILS_FETCH_INTERVAL);
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			clearTimeout(this.timeout);
			clearInterval(this.interval);
			this.getOrderDetails();
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		clearTimeout(this.timeout);
	}

	render() {
		if (this.state.notFound)
			return <NotFound />;

		let orderDetails = null;
		if (this.state.expired && this.state.orderStatus == 1)
			orderDetails = <OrderExpired />;
		else if (this.state.orderStatus == 1)
			orderDetails = <OrderInitial expired={this.state.expired} depositAmount={this.state.depositAmount} depositCoin={this.state.depositCoin} depositAddress={this.state.depositAddress} timeRemaining={this.state.timeRemaining} />;
		else if (this.state.orderStatus == -1)
			orderDetails = <OrderPayment orderRef={this.props.match.params.orderRef} order={this.state.order} />;
		else if (this.state.orderStatus == 2)
			orderDetails = <OrderPaid orderRef={this.props.match.params.orderRef} order={this.state.order} />;
		else if (this.state.orderStatus == 3)
			orderDetails = <OrderReleased orderRef={this.props.match.params.orderRef} order={this.state.order} />;
		else if (this.state.orderStatus == 4)
			orderDetails = <OrderSuccess orderRef={this.props.match.params.orderRef} />;
		else if (this.state.orderStatus == 0 || this.state.orderStatus == -2)
			orderDetails = <OrderFailure orderRef={this.props.match.params.orderRef} />;

		return (
			<div id="order">
				<div className="container">
					<div className="row">
					    <div id="order-header" className="col-xs-12">
					    	<h3 id="order-ref">Order Reference: <b>{this.props.match.params.orderRef}</b></h3>
					    	<button id="bookmark-button" type="button" className="btn btn-default btn-simple" onClick={() => this.setState({showBookmarkModal:true})}>BOOKMARK</button>
					    </div>
					</div>

					<div className="row">
					    <div className="col-xs-12 col-sm-6">
					    	<div className="coin-box box media">
					    		<div className="media-left">
					    			<i className={`coin-icon cc-${this.state.depositCoin} ${this.state.depositCoin}`}></i>
					    		</div>

					    		<div className="media-body">
						    		<h5><b>Deposit {this.state.depositAmount} {this.state.depositCoin}</b></h5>
						    		<h6>{this.state.depositAddress}</h6>
					    		</div>
					    	</div>
					    </div>

					    <div className="col-xs-12 col-sm-6">
					    	<div className="coin-box box media">
					    		<div className="media-left">
					    			<i className={`coin-icon cc-${this.state.receiveCoin} ${this.state.receiveCoin}`}></i>
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
					    		{this.state.loading ?
					    			<div className="col-xs-12 text-center"><h2>Loading</h2></div> :
					    			orderDetails
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

			    <Bookmark show={this.state.showBookmarkModal} onClose={() => this.setState({showBookmarkModal: false})} />
			</div>
		);
	}
}

export default Order;
