import React, { Component } from 'react';
import moment from 'moment';
import isFiatOrder from '../../helpers/isFiatOrder';

import OrderInitialFiat from '../order-fiat/OrderInitial';
import OrderInitialCrypto from '../order-crypto/OrderInitial';
import OrderExpired from '../order/OrderExpired';

class OrderInitial extends Component {
  constructor(props) {
    super(props);
    this.state = { time: this.calculateRemainingTime() };

    this.calculateRemainingTime = this.calculateRemainingTime.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  calculateRemainingTime() {
    const now = moment().subtract(this.props.order.payment_window, 'minutes');
    const createdOn = moment(this.props.order.created_on);
    let time = createdOn.diff(now);

    if (time < 0) {
      clearInterval(this.interval);
    } else {
      time = moment.utc(time).format('mm:ss');
    }

    return time;
  }

  tick() {
    if (!this.props.order) return;

    const time = this.calculateRemainingTime();
    this.setState({ time });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.time < 0) {
      return <OrderExpired {...this.props} />;
    } else if (isFiatOrder(this.props.order)) {
      return <OrderInitialFiat time={this.state.time} {...this.props} />;
    } else {
      return <OrderInitialCrypto time={this.state.time} {...this.props} />;
    }
  }
}

export default OrderInitial;
