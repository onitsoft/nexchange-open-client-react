import React, { Component } from 'react';
import moment from 'moment';
import isFiatOrder from 'Utils/isFiatOrder';
import OrderInitialFiat from './OrderInitialFiat/OrderInitialFiat';
import OrderInitialCrypto from './OrderInitialCrypto/OrderInitialCrypto';
import OrderExpired from '../OrderExpired/OrderExpired';

class OrderInitial extends Component {
  constructor(props) {
    super(props);
    this.state = { time: this.calculateRemainingTime() };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  calculateRemainingTime = () => {
    const now = moment()
      .utc()
      .subtract(this.props.order.payment_window, 'minutes');
    const createdOn = moment(this.props.order.created_on);
    let time = createdOn.diff(now);

    if (time < 0) {
      clearInterval(this.interval);
    } else {
      time = moment.utc(time).format('mm:ss');
    }

    return time;
  };

  tick() {
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
