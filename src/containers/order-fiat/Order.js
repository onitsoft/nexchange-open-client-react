import React, { Component } from 'react';
import STATUS_CODES from '../../statusCodes';

import OrderInitial from './OrderInitial';
import OrderPayment from './OrderPayment';
import OrderPaid from './OrderPaid';
import OrderPreReleased from './OrderPreReleased';
import OrderReleased from './OrderReleased';

import OrderSuccess from '../order/OrderSuccess';
import OrderFailure from '../order/OrderFailure';


class Order extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		switch (STATUS_CODES[this.props.order.status_name[0][0]]) {
			case 'INITIAL':
				return <OrderInitial {...this.props} />;
				break;
			case 'PAID_UNCONFIRMED':
				return <OrderPayment {...this.props} />;
				break;
			case 'PAID':
				return <OrderPaid {...this.props} />;
				break;
			case 'PRE_RELEASE':
				return <OrderPreReleased {...this.props} />;
				break;
			case 'RELEASE':
				return <OrderReleased {...this.props} />;
				break;
			case 'COMPLETED':
				return <OrderSuccess {...this.props} />;
				break;
			case 'CANCELLED':
				return <OrderFailure {...this.props} />;
				break;
			default:
				return <h2>Unknown order state, something went wrong</h2>;
		}
	}
};

export default Order;
