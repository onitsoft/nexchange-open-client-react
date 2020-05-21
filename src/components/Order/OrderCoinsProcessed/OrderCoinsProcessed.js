import React, { Component } from 'react';
import axios from 'axios';
import config from 'Config';
import OrderCoinProcessed from './OrderCoinProcessed/OrderCoinProcessed';
import styles from './OrderCoinsProcessed.scss';
import ArrowRight from './images/arrow-right.svg';

let ratesInterval;
class OrderCoinsProcessed extends Component {
  state = {
    min_amount_quote: '...',
    max_amount_quote: '...',
    min_amount_base: '...',
    max_amount_base: '...',
    updatedToAmount: undefined,
    dynamicRates: false,
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

  componentDidUpdate(prevProps, prevState){
    const orderStatus = this.props.order.status_name[0][0];
    const deadlineFinished = new Date(this.props.order.payment_deadline).getTime() < Date.now();
    
    // Comment: Show dynamic rates only if order status is initial
    if (deadlineFinished && orderStatus === 11) {
      if(!this.state.dynamicRates) this.setState({dynamicRates: true})
      
      if(!prevState.dynamicRates && this.state.dynamicRates) {
        this.fetchCurrentAmount();
        ratesInterval = setInterval(this.fetchCurrentAmount, config.PRICE_COMPARISON_INTERVAL);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(ratesInterval);
  }

  fetchCurrentAmount = () => {
    const pair = `${this.props.order.pair.base.code}${this.props.order.pair.quote.code}`;
    axios.get(`${config.API_BASE_URL}/get_price/${pair}/?amount_quote=${this.props.order.amount_quote}`).then(({ data }) => {
      this.setState({ updatedToAmount: data.amount_base });
    });
  };

  render() {
    return (
      <div>
        <OrderCoinProcessed type="Deposit" order={this.props.order} min={this.state.min_amount_quote} max={this.state.max_amount_quote} />
        <div className={`${styles.container} hidden-xs hidden-sm`}>
          <ArrowRight className={styles.arrow} />
        </div>
        <OrderCoinProcessed
          type="Receive"
          order={this.props.order}
          updatedToAmount={this.state.updatedToAmount}
          min={this.state.min_amount_base}
          max={this.state.max_amount_base}
        />
      </div>
    );
  }
}

export default OrderCoinsProcessed;
