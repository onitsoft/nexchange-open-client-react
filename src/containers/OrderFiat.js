import React, { Component } from 'react';
import OrderInitialFiat from '../components/OrderInitialFiat';
import OrderPaymentFiat from './OrderPaymentFiat';
import OrderPaidFiat from '../components/OrderPaidFiat';
import OrderPreReleasedFiat from '../components/OrderPreReleasedFiat';
import OrderReleasedFiat from '../components/OrderReleasedFiat';
import OrderSuccess from '../components/OrderSuccess';
import OrderFailure from '../components/OrderFailure';
import OrderExpired from '../components/OrderExpired';


class OrderFiat extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (

		)
	}
};

export default OrderFiat;




			// if (STATUS_CODES[this.state.orderStatus] == 'INITIAL')
			// 	orderDetails = <OrderInitialFiat expired={this.state.expired} depositAmount={this.state.depositAmount} depositCoin={this.state.depositCoin} depositCoinName={this.state.depositCoinName} depositAddress={this.state.depositAddress}  timeRemaining={this.state.timeRemaining} order={this.state.order} />;
			// else if (STATUS_CODES[this.state.orderStatus] == 'PAID_UNCONFIRMED')
			// 	orderDetails = <OrderPaymentFiat {...this.props} order={this.state.order} />;
			// else if (STATUS_CODES[this.state.orderStatus] == 'PAID')
			// 	orderDetails = <OrderPaidFiat {...this.props} order={this.state.order} />;
			// else if (STATUS_CODES[this.state.orderStatus] == 'PRE_RELEASE')
			// 	orderDetails = <OrderPreReleasedFiat {...this.props} order={this.state.order} />;
			// else if (STATUS_CODES[this.state.orderStatus] == 'RELEASE')
			// 	orderDetails = <OrderReleasedFiat {...this.props} order={this.state.order} />;
			// else if (STATUS_CODES[this.state.orderStatus] == 'COMPLETED')
			// 	orderDetails = <OrderSuccess {...this.props} />;
			// else if (STATUS_CODES[this.state.orderStatus] == 'CANCELLED')
			// 	orderDetails = <OrderFailure {...this.props} />;