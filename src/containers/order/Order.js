import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCoinDetails, fetchOrder } from '../../actions';

import '../../css/order.scss';
import Helpers from '../../helpers';

import OrderInfo from './OrderInfo';
import OrderTop from './OrderTop';
import CoinProcessed from './CoinProcessed';

import NotFound from '../../components/NotFound';
import Loading from '../../components/Loading';

import Notifications from '../../containers/Notifications';
import RefundAddress from '../../containers/RefundAddress'
import ReferralBox from '../../containers/ReferralBox';


class Order extends Component {
	constructor(props) {
		super(props);
		this.state = { order: null };
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
		this.setState({ order: nextProps.order });
	}

	render() {
		if (this.state.order == null) {
			return <Loading />;
		} else if (this.state.order === 404) {
			return <NotFound />;
		} else if (typeof this.state.order === 'object') {
			return (
				<div id="order" className={Helpers.isFiatOrder(this.state.order) ? 'order-fiat' : 'order-crypto'}>
					<div className="container">
						<OrderTop order={this.state.order} {...this.props} />
	
						<div className="row">
							<CoinProcessed type="Deposit" order={this.state.order} {...this.props} />
							<CoinProcessed type="Receive" order={this.state.order} {...this.props} />
							<OrderInfo order={this.state.order} {...this.props} />
							<Notifications order={this.state.order} {...this.props} />

							{!Helpers.isFiatOrder(this.state.order) &&
								<RefundAddress order={this.state.order} {...this.props} />}
								
							<ReferralBox order={this.state.order} {...this.props} />
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
