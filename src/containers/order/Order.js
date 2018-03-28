import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrder } from '../../actions';

import '../../css/order.scss';
import Helpers from '../../helpers';
import config from '../../config';

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
		this.timeout = setTimeout(() => {
			this.props.fetchOrder(this.props.match.params.orderRef);
		}, config.ORDER_DETAILS_FETCH_INTERVAL);

		if (nextProps.order !== 429) {
			this.setState({ order: nextProps.order });

			if (this.props.order && 
				this.props.order.status_name[0][0] === 11 && 
				nextProps.order.status_name[0][0] === 12) {
				ga('send', 'event', 'Order', 'order paid', nextProps.unique_reference);
			}
		}
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
						<OrderTop order={this.state.order} />
	
						<div className="row">
							<CoinProcessed type="Deposit" order={this.state.order} />
							<CoinProcessed type="Receive" order={this.state.order} />
							
							<OrderInfo order={this.state.order} />
							<Notifications order={this.state.order} />

							{!Helpers.isFiatOrder(this.state.order) &&
								<RefundAddress order={this.state.order} />}
								
							<ReferralBox order={this.state.order} />
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

export default connect(mapStateToProps, { fetchOrder })(Order);