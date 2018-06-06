import React, { Component } from 'react';

class OrderExpired extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    return (
      <div className="text-center">
        <h2>Order Expired</h2>
        <h5>Your order is expired. You can make a new exchange order.</h5>

        <h4
          className="text-warning"
          data-toggle="tooltip"
          data-placement="top"
          data-original-title="
						If you have already sent your coins, don’t worry.
						Once we get them, the status of the order will be updated retroactively."
          style={{ margin: '25px 0 5px 0', fontWeight: 500 }}
        >
          Already sent?
        </h4>
      </div>
    );
  }
}

export default OrderExpired;
