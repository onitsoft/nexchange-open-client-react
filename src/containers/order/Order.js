import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { fetchCoinDetails, fetchOrder } from '../../actions';

import '../../css/order.scss';

import config from '../../config';

import OrderTop from './OrderTop';
import CoinProcessed from './CoinProcessed';
import OrderCrypto from '../order-crypto/Order';
import OrderFiat from '../order-fiat/Order';
import OrderStatusFiat from '../order-fiat/OrderStatus';
import OrderExpired from './OrderExpired';

import NotFound from '../../components/NotFound';
import Loading from '../../components/NotFound';

import Notifications from '../../containers/Notifications';
import RefundAddress from '../../containers/RefundAddress'
import ReferralBox from '../../containers/ReferralBox';

import STATUS_CODES from '../../statusCodes';


class Order extends Component {
	constructor(props) {
		super();
		this.state = {
			timeRemaining: '...',
			expired: false
		};

		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.props.fetchOrder(this.props.match.params.orderRef);
		this.props.fetchCoinDetails();
	}

	tick() {
		if (!this.props.order) return;

		let now = moment().subtract(this.props.order.payment_window, 'minutes');
		let createdOn = moment(this.props.order.created_on);
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

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			clearTimeout(this.timeout);
			clearInterval(this.interval);
			this.props.fetchOrder(this.props.match.params.orderRef);
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		clearTimeout(this.timeout);
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps)
	}

	renderOrderInfo(isFiat) {
		if (this.state.expired && STATUS_CODES[this.props.order.status_name[0][0]] === 'INITIAL') {
			return <OrderExpired />;
		} else {
			if (isFiat) {
				return <OrderFiat
					order={this.props.order}
					timeRemaining={this.state.timeRemaining}
					{...this.props} />;
			} else {
				return <OrderCrypto
					order={this.props.order}
					timeRemaining={this.state.timeRemaining}
					{...this.props} />
			}
		}
	}

	render() {
		if (this.props.order === null) {
			return <Loading />;
		} else if (this.props.order === 404) {
			return <NotFound />;
		} else if (typeof this.props.order === 'object') {
			const isFiat = !this.props.order.pair.quote.is_crypto;
	
			return (
				<div id="order" className={isFiat ? 'order-crypto' : 'order-fiat'}>
					<div className="container">
						<OrderTop orderRef={this.props.match.params.orderRef} />
	
						<div className="row">
							<CoinProcessed type="Deposit" />
							<CoinProcessed type="Receive" />
							{this.renderOrderInfo(isFiat)}
							<Notifications />
							<RefundAddress />
							<ReferralBox />
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = ({ order }) => {
    return { order };
}

export default connect(mapStateToProps, { fetchCoinDetails, fetchOrder })(Order);
