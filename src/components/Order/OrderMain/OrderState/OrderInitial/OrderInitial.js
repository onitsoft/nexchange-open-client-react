import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import config from 'Config';
import isFiatOrder from 'Utils/isFiatOrder';
import OrderInitialFiat from './OrderInitialFiat/OrderInitialFiat';
import OrderInitialCrypto from './OrderInitialCrypto/OrderInitialCrypto';
import OrderExpired from '../OrderExpired/OrderExpired';

class OrderInitial extends Component {
  constructor(props) {
    super(props);
    const time = this.calculateRemainingTime();
    this.state = { time, repeatOrder: false };
    this.tick = this.tick.bind(this);
    this.shouldRepeatOrder = false;
    this.alreadyRepeatedOrder = false;
    this.updatingRates = false;
  }

  UNSAFE_componentWillMount() {  
    if(!(this.state.time < 0)) {
      this.interval = setInterval(this.tick, 1000);
      this.shouldRepeatOrder = true;
      this.alreadyRepeatedOrder = false;
      this.updatingRates = false;
    }
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    //New Order
    if(this.props.order.unique_reference !== nextProps.order.unique_reference) {
      const time = this.calculateRemainingTime(nextProps.order);   
      this.setState({time, repeatOrder: false});
    }

    //Rates are updated, enable repeat order
    if (!this.state.repeatOrder && !this.alreadyRepeatedOrder && this.updatingRates) {
      this.alreadyRepeatedOrder = true;
      this.updatingRates = false;
      this.setState({repeatOrder: true});
      }
    }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    //Fetch updated rates for the expired order
    if (nextState.time < 0 && this.shouldRepeatOrder) { 
      const order = this.props.order;

      const data = {
        pair: order.pair.name,
        lastEdited: 'deposit',
      };

      data['deposit'] = order.amount_quote;
      this.shouldRepeatOrder = false;
      this.props.fetchPrice(data);
      this.updatingRates = true;
      clearInterval(this.interval);
    } else if (!(nextState.time < 0) && !this.shouldRepeatOrder) {
      this.shouldRepeatOrder = true;
      this.alreadyRepeatedOrder = false;
      this.interval = setInterval(this.tick, 1000);
    }

    //Repeat the order at updated rates
    if(nextState.repeatOrder) {
      this.setState({repeatOrder: false});
      const order = nextProps.order;
      const price = nextProps.price;
      const data = {
        amount_base: price.receive,
        amount_quote: order.amount_quote,
        is_default_rule: true,
        pair: {
          name: order.pair.name,
        },
        withdraw_address: {
          address: order.withdraw_address.address,
          name: '',
          payment_id: order.withdraw_address.payment_id,
          destination_tag: order.withdraw_address.destination_tag,
          memo: order.withdraw_address.memo,
        },
      };
  
      axios
      .post(`${config.API_BASE_URL}/orders/`, data)
      .then(response => {
        const data = response.data;
        this.props.setOrder(data);
        this.props.history.push(`/order/${data.unique_reference}`)
      })
      .catch(error => {
        console.log('Error:', error);
      });
    }
  }


  calculateRemainingTime = (nextPropsOrder) => {
    const order = nextPropsOrder || this.props.order;
    const now = moment()
      .utc()
      .subtract(order.payment_window, 'minutes');
    const createdOn = moment(order.created_on);
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
    if (!this.props.isLimitOrder && this.state.time < 0) {
      return <OrderExpired {...this.props} />;
    } else if (isFiatOrder(this.props.order)) {
      return <OrderInitialFiat time={this.state.time} {...this.props} />;
    } else {
      return <OrderInitialCrypto time={this.state.time} {...this.props} />;
    }
  }
}

export default OrderInitial;
