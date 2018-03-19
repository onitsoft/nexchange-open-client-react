import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCoinDetails, fetchOrder } from '../../actions';

import '../../css/order.scss';
import Helpers from '../../helpers';

import OrderInfo from './OrderInfo';
import OrderTop from './OrderTop';
import CoinProcessed from './CoinProcessed';

import NotFound from '../../components/NotFound';
import Loading from '../../components/NotFound';

import Notifications from '../../containers/Notifications';
import RefundAddress from '../../containers/RefundAddress'
import ReferralBox from '../../containers/ReferralBox';


class Order extends Component {
	constructor(props) {
		super();
		this.state = {
			expired: false
		};
	}

	componentDidMount() {
		this.props.fetchOrder(this.props.match.params.orderRef);
		this.props.fetchCoinDetails();
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
		// TODO: Handle order 429 case
		// console.log(nextProps)
	}

	render() {
		if (this.props.order === null) {
			return <Loading />;
		} else if (this.props.order === 404) {
			return <NotFound />;
		} else if (typeof this.props.order === 'object') {
			return (
				<div id="order" className={Helpers.isFiatOrder(this.props.order) ? 'order-fiat' : 'order-crypto'}>
					<div className="container">
						<OrderTop {...this.props} />
	
						<div className="row">
							<CoinProcessed type="Deposit" {...this.props} />
							<CoinProcessed type="Receive" {...this.props} />
							<OrderInfo {...this.props} />
							<Notifications {...this.props} />
							<RefundAddress {...this.props} />
							<ReferralBox {...this.props} />
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
