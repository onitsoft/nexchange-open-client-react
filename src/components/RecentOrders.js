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
		let orders = this.state.orders.slice(0,config.RECENT_ORDERS_COUNT).map(order => {
			return (
				<div key={order.unique_reference} className="recent-order">
					<a href={`${config.API_BASE_URL}/orders/${order.unique_reference}?format=json`} target="_blank" className="overlay">Click to view on API</a>

					<div className="col-xs-4 coins-container">
						<div className="coins">
							<i className={`coin-icon cc-${order.pair.quote.code} ${order.pair.quote.code}`}></i>
							<i className="fa fa-arrow-right" aria-hidden="true"></i>
							<i className={`coin-icon cc-${order.pair.base.code} ${order.pair.base.code}`}></i>
						</div>
					</div>

					<div className="col-xs-4 recent-order-amount">
						<p>{parseFloat(order.amount_quote).toFixed(3)} <b className="hidden-xs">{order.pair.quote.code}</b> to {parseFloat(order.amount_base).toFixed(3)} <b className="hidden-xs">{order.pair.quote.base}</b></p>
					</div>

					<div className="col-xs-4 created-on">
						<p>{new moment(order.created_on).fromNow()}</p>
					</div>
				</div>
			);
		});

		return (
			<div id="recent-orders">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<h3>Recent Orders</h3>

							<div className="recent-orders-container">
								{orders.length < 1 ? (
									<div className="spinner">
									  <div className="rect1"></div>
									  <div className="rect2"></div>
									  <div className="rect3"></div>
									  <div className="rect4"></div>
									  <div className="rect5"></div>
									  <div className="rect6"></div>
									  <div className="rect7"></div>
									  <div className="rect8"></div>
									  <div className="rect9"></div>
									  <div className="rect10"></div>
									</div>
								) : (
									orders
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default OrderStatus;
