import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCoinDetails } from '../../actions';

import '../../css/order.scss';
import Helpers from '../../helpers';

import OrderInfo from './OrderInfo';
import OrderTop from './OrderTop';
import CoinProcessed from './CoinProcessed';

import Bookmark from '../Bookmark';
import NotFound from '../../components/NotFound';
import ReferralBox from '../../containers/ReferralBox';
import RefundAddress from '../../containers/RefundAddress'

import Notifications from '../../containers/Notifications';


class Order extends Component {
	constructor(props) {
		super();
		this.state = {
			expired: false
		};
	}

	componentDidMount() {
		this.getOrderDetails();
		this.props.fetchCoinDetails();
		this.getUser();
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

					<Bookmark show={this.state.showBookmarkModal} onClose={() => this.setState({showBookmarkModal: false})} />
				</div>
			);
		}
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCoinDetails: fetchCoinDetails
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Order);
