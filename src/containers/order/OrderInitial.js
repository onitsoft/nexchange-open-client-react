import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../../helpers';

import OrderInitialFiat from '../order-fiat/OrderInitial';
import OrderInitialCrypto from '../order-crypto/OrderInitial';
import OrderExpired from '../order/OrderExpired';
import Loading from '../../components/Loading';

class OrderInitial extends Component {
    constructor(props) {
        super(props);
        this.state = { time: '...' }
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }

	tick() {
		if (!this.props.order) return;

		const now = moment().subtract(this.props.order.payment_window, 'minutes');
		const createdOn = moment(this.props.order.created_on);
		let time = createdOn.diff(now);

		if (time < 0) {
			clearInterval(this.interval);
		} else {
			time = moment.utc(time).format('mm:ss')
		}

		this.setState({ time });
	}

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (this.state.time === '...') {
            return <Loading />
        } else if (this.state.time < 0) {
            return <OrderExpired {...this.props} />;
        } else if (Helpers.isFiatOrder(this.props.order)) {
            return <OrderInitialFiat time={this.state.time} {...this.props} />
        } else {
            return <OrderInitialCrypto time={this.state.time} {...this.props} />
        }
    }
}

export default OrderInitial;