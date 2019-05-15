import React, { Component } from 'react';
import axios from 'axios';
import config from 'Config';
import OrderCoinProcessed from './OrderCoinProcessed/OrderCoinProcessed';
import styles from './OrderCoinsProcessed.scss';
import ArrowRight from './images/arrow-right.svg';

class OrderCoinsProcessed extends Component {
  state = {
    min_amount_quote: '...',
    max_amount_quote: '...',
    min_amount_base: '...',
    max_amount_base: '...',
  };

  componentDidMount() {
    const pair = `${this.props.order.pair.base.code}${this.props.order.pair.quote.code}`;
    const url = `${config.API_BASE_URL}/get_price/${pair}/`;

    axios
      .get(url)
      .then(res => {
        const { min_amount_quote, min_amount_base, max_amount_quote, max_amount_base } = res.data;

        this.setState({
          min_amount_base,
          max_amount_base,
          min_amount_quote,
          max_amount_quote,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const order = this.props.order;
    const pullArrowRight = order.isLimitOrder && order.order_type === 0;
    return (
      <div>
        <OrderCoinProcessed type="Deposit" order={order} min={this.state.min_amount_quote} max={this.state.max_amount_quote} />
        <div className={`${styles.container} hidden-xs hidden-sm ${pullArrowRight ? styles['pull-right-md'] : ''}`}>
          <ArrowRight className={`${styles.arrow}`} />
        </div>
        <OrderCoinProcessed type="Receive" order={order} min={this.state.min_amount_base} max={this.state.max_amount_base} />
      </div>
    );
  }
}

export default OrderCoinsProcessed;
