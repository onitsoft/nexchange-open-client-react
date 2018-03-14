import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import Helpers from '../helpers';
import config from '../config';

import LoadingComponent from '../components/LoadingComponent.js';


class OrderStatus extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: []
		}

		this.fetchRecentOrders = this.fetchRecentOrders.bind(this);
		this.fetchRecentOrders();
	}

	fetchRecentOrders(coinsInfo) {
		if (coinsInfo == null) coinsInfo = this.props.coinsInfo;

		let params = Helpers.urlParams(),
			depositCurrencies = coinsInfo.filter(coin => coin.is_quote_of_enabled_pair),
			receiveCurrencies = coinsInfo.filter(coin => coin.is_base_of_enabled_pair);

		if (params && params.hasOwnProperty('test')) {
			depositCurrencies = coinsInfo.filter(coin => coin.is_quote_of_enabled_pair_for_test);
			receiveCurrencies = coinsInfo.filter(coin => coin.is_base_of_enabled_pair_for_test);
		}

		depositCurrencies = depositCurrencies.map(coin => coin.code);
		receiveCurrencies = receiveCurrencies.map(coin => coin.code);

        axios.get(`${config.API_BASE_URL}/orders/?page=1`)
        	.then(response => {
        		let orders = response.data.results.filter(order => {
		        	return (params && params.hasOwnProperty('test')) ? true : (
		        		_.contains(receiveCurrencies, order.pair.base.code) &&
		        		_.contains(depositCurrencies, order.pair.quote.code));
        		});

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

	componentWillReceiveProps(nextProps) {
		if(this.props.coinsInfo.length == 0 && nextProps.coinsInfo.length > 0) {
			this.fetchRecentOrders(nextProps.coinsInfo);
		}
	}

	render() {
		let orders = this.state.orders.slice(0,config.RECENT_ORDERS_COUNT).map(order => {
			return (
				<div key={order.unique_reference} className="recent-order">
					<a href={`${config.API_BASE_URL}/orders/${order.unique_reference}`} target="_blank" className="overlay">Click to view on API</a>

					<div className="col-xs-4 coins-container">
						<div className="coins">
							<i className={`coin-icon cc-${order.pair.quote.code} ${order.pair.quote.code}`}></i>
							<i className="fa fa-arrow-right" aria-hidden="true"></i>
							<i className={`coin-icon cc-${order.pair.base.code} ${order.pair.base.code}`}></i>
						</div>
					</div>

					<div className="col-xs-4 recent-order-amount">
						<p>{Math.round(parseFloat(order.amount_quote) * 1000) / 1000} <b className="hidden-xs">{order.pair.quote.code}</b> to {Math.round(parseFloat(order.amount_base) * 1000) / 1000} <b className="hidden-xs">{order.pair.base.code}</b></p>
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
							<h2>Recent Orders</h2>

							<div className="recent-orders-container">
								{orders.length < 1 ? (
									<LoadingComponent isLoading={true} />
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


function mapStateToProps(state) {
	return {
		coinsInfo: state.coinsInfo
	}
}

export default connect(mapStateToProps)(OrderStatus);
