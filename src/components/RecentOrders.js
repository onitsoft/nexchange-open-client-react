import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import config from '../config';

class OrderStatus extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: []
		}

		this.fetchRecentOrders = this.fetchRecentOrders.bind(this);
		this.fetchRecentOrders();
	}

	fetchRecentOrders() {
        axios.get(`${config.API_BASE_URL}/orders/?page=1`)
        	.then(response => {
        		console.log(response.data.results);

        		let orders = response.data.results;
        		this.setState({orders: orders});
        	})
        	.catch(error => {
        		console.log(error);
        	});

        this.timeout = setTimeout(() => {
        	this.fetchRecentOrders();
        }, config.RECENT_ORDERS_INTERVAL);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	render() {
		let orders = this.state.orders.map(order => {
			console.log(order);
			return (
				<div key={order.unique_reference} className="recent-order">
					<div className="col-xs-4">
						<i className={`coin-icon cc-${order.deposit_address.currency_code} ${order.deposit_address.currency_code}`}></i>
						<i className="fa fa-arrow-right" aria-hidden="true"></i>
						<i className={`coin-icon cc-${order.withdraw_address.currency_code} ${order.withdraw_address.currency_code}`}></i>
					</div>

					<div className="col-xs-4">
						<p>{parseFloat(order.amount_quote).toFixed(2)} {order.deposit_address.currency_code} to {parseFloat(order.amount_base).toFixed(2)} {order.withdraw_address.currency_code}</p>
					</div>

					<div className="col-xs-4">
						<p>{new moment(order.created_on).fromNow()}</p>
					</div>
				</div>
			);
		});

		return (
			<div id="recent-orders" className="container">
				<div className="row">
					<div className="col-xs-12">
						<h3>Recent Orders</h3>

						{orders}
					</div>
				</div>
			</div>
		);
	}
}

export default OrderStatus;
