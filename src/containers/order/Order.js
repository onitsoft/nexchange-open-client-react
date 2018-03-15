import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import moment from 'moment';

import { fetchCoinDetails } from '../../actions';

import '../../css/order.scss';

import config from '../../config';

import OrderCrypto from '../order-crypto/Order';
import OrderFiat from '../order-fiat/Order';
import OrderStatusCrypto from '../order-crypto/OrderStatus';
import OrderStatusFiat from '../order-fiat/OrderStatus';
import OrderExpired from './OrderExpired';

import Bookmark from '../Bookmark';
import NotFound from '../../components/NotFound';
import CoinProcessed from './CoinProcessed';
import ReferralBox from '../../containers/ReferralBox';

import Notifications from '../../containers/Notifications';

import STATUS_CODES from '../../statusCodes';


class Order extends Component {
	constructor(props) {
		super();
		this.state = {
			timeRemaining: '...',
			expired: false,
			loading: true,
			showBookmarkModal: false,
			notFound: false,
			order: null,
		};

		this.getOrderDetails = this.getOrderDetails.bind(this);
		this.tick = this.tick.bind(this);
		this.trackRefShare = this.trackRefShare.bind(this);
	}

	componentDidMount() {
		this.getOrderDetails();
		this.props.fetchCoinDetails();
	}

	tick() {
		if (!this.state.order) return;

		let now = moment().subtract(this.state.order.payment_window, 'minutes');
		let createdOn = moment(this.state.order.created_on);
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
		axios.get(`${config.API_BASE_URL}/orders/${this.props.match.params.orderRef}/?_=${Math.round((new Date()).getTime())}`)
		.then((response) => {
			let order = response.data;

			if (this.state.order && this.state.order.status_name[0][0] === 11 && order.status_name[0][0] === 12) {
				ga('send', 'event', 'Order', 'order paid', order.unique_reference);
			}

			this.setState({
				loading: false,
				order: order
			}, () => {
				if (this.interval)
					clearInterval(this.interval);

				if (STATUS_CODES[this.state.order.status_name[0][0]] === 'INITIAL') {
					this.interval = setInterval(this.tick, 1000);
					this.tick();
				}

				$(function() {
				    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
				});

				this.timeout = setTimeout(() => {
					this.getOrderDetails();
				}, config.ORDER_DETAILS_FETCH_INTERVAL);
			})
		})
		.catch((error) => {
			console.log(error);

			if (error.response && error.response.status == 429) {
				this.timeout = setTimeout(() => {
					this.getOrderDetails();
				}, config.ORDER_DETAILS_FETCH_INTERVAL * 2);
			} else {
				this.setState({notFound: true});
			}
		});
	}

	trackRefShare() {
		ga('send', 'event', 'Referral', 'share', this.props.match.params.orderRef);
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

		let orderInfo = null, orderStatus, isCrypto;
		if (this.state.order) {
			isCrypto = this.state.order.pair.quote.is_crypto;

			if (this.state.expired && STATUS_CODES[this.state.order.status_name[0][0]] == 'INITIAL') {
				orderInfo = <OrderExpired />;
			} else {
				if (!isCrypto) {
					orderStatus = <OrderStatusFiat status={this.state.order.status_name[0][0]} />;
					orderInfo = <OrderFiat
						order={this.state.order}
						timeRemaining={this.state.timeRemaining}
						{...this.props} />;
				} else {
					orderStatus = <OrderStatusCrypto status={this.state.order.status_name[0][0]} />;
					orderInfo = <OrderCrypto
						order={this.state.order}
						timeRemaining={this.state.timeRemaining}
						{...this.props} />
				}
			}
		}

		return (
			<div id="order" className={isCrypto ? 'order-crypto' : 'order-fiat'}>
				<div className="container">
					<div className="row">
					    <div id="order-header" className="col-xs-12">
					    	<h3 id="order-ref">Order Reference: <b>{this.props.match.params.orderRef}</b></h3>
					    	<button id="bookmark-button" type="button" className="btn btn-default btn-simple" onClick={() => this.setState({showBookmarkModal:true})}>BOOKMARK</button>
					    </div>
					</div>

					<div className="row">
						<CoinProcessed order={this.state.order} type="Deposit" />
						<CoinProcessed order={this.state.order} type="Receive" />

					    <div className="col-xs-12">
					    	<div className="box">
					    		{this.state.loading ?
					    			<div className="row">
					    				<div className="col-xs-12 text-center"><h2>Loading</h2></div>
					    			</div> : orderInfo
					    		}

						    	{orderStatus}
					    	</div>
					    </div>

						<Notifications />

					    {this.state.order && <ReferralBox order={this.state.order} /> }
					</div>
				</div>

				<Bookmark show={this.state.showBookmarkModal} onClose={() => this.setState({showBookmarkModal: false})} />
			</div>
		);
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCoinDetails: fetchCoinDetails
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Order);
