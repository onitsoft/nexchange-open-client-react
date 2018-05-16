import React from 'react';

const OrderInitial = props => {
  return (
    <div id="order-payment">
      <div
        id="order-payment-details"
        className="col-xs-12 col-ms-6 col-sm-6 col-md-4"
      >
        <h3>
          Time remaining:{' '}
          <span id="time-remaining">
            <b>{props.time}</b>
          </span>
        </h3>
        <h4>
          Pay{' '}
          <b>
            {parseFloat(props.order.amount_quote)} {props.order.pair.quote.code}
          </b>
        </h4>
        <a
          href={props.order.payment_url}
          target="_blank"
          className="btn btn-default btn-themed"
        >
          <i
            className="fa fa-credit-card"
            aria-hidden="true"
            style={{ position: 'relative', left: -13 }}
          />
          Pay now
        </a>
      </div>

      <div id="cards" className="col-xs-12 col-ms-6 col-sm-6 col-md-8">
        <h3>Accepted cards:</h3>

        <div className="visible-xs-block visible-sm-block">
          <img src="/img/order/cards-mobile.png" alt="Credit cards accepted" />
        </div>

        <div className="visible-md-block visible-lg-block">
          <img src="/img/order/cards-desktop.png" alt="Credit cards accepted" />
        </div>
      </div>
    </div>
  );
};

export default OrderInitial;
