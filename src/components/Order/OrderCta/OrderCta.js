import React, { Component } from 'react';
import OrderNotifications from './OrderNotifications/OrderNotifications';
import OrderReferrals from './OrderReferrals/OrderReferrals';

class OrderCta extends Component {
  render() {
    return (
      <div>
        <OrderNotifications order={this.props.order} />
        <OrderReferrals order={this.props.order} />
      </div>
    );
  }
}

export default OrderCta;
