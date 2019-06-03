import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { fetchOrder, fetchPrice, setOrder } from 'Actions';

import isFiatOrder from 'Utils/isFiatOrder';
import config from 'Config';

import OrderMain from './OrderMain/OrderMain';
import OrderTop from './OrderTop/OrderTop';

import NotFound from 'Components/NotFound/NotFound';
import OrderLoading from './OrderLoading/OrderLoading';
import OrderCoinsProcessed from './OrderCoinsProcessed/OrderCoinsProcessed';
import OrderCta from './OrderCta/OrderCta';

import styles from './Order.scss';

class Order extends Component {
  constructor(props) {
    super(props);

    if (this.props.order && this.props.match.params.orderRef === this.props.order.unique_reference) {
      this.state = { order: this.props.order };
    } else {
      this.state = {};
    }
  }

  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.orderRef);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      clearTimeout(this.timeout);
      clearInterval(this.interval);
      this.props.fetchOrder(this.props.match.params.orderRef);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ order: nextProps.order });

    this.timeout = setTimeout(() => {
      this.props.fetchOrder(this.props.match.params.orderRef);
    }, config.ORDER_DETAILS_FETCH_INTERVAL);

    if (nextProps.order !== 429) {
      this.setState({ order: nextProps.order });

      if (
        this.props.order &&
        this.props.order.status_name.length > 0 &&
        this.props.order.status_name[0][0] === 11 &&
        nextProps.order.status_name[0][0] === 12
      ) {
        window.gtag('event', 'Order paid', {event_category: 'Order', event_label: `${nextProps.unique_reference}`});
      }
    }
  }

  render() {
    if (this.state.order == null) {
      return <OrderLoading />;
    } else if (this.state.order === 404) {
      return <NotFound />;
    } else if (typeof this.state.order === 'object') {
      return (
        <div className={`${styles.container} ${isFiatOrder(this.state.order) ? 'order-fiat' : 'order-crypto'}`}>
          <div className="container">
            <div className="row">
              <OrderTop order={this.state.order} />
              <OrderCoinsProcessed order={this.state.order} />

              <OrderMain {...this.props} />
              <OrderCta order={this.state.order} />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ order, price }) => ({ order, price });
const mapDistachToProps = dispatch => bindActionCreators({ fetchOrder, fetchPrice, setOrder }, dispatch);

export default connect(
  mapStateToProps,
  mapDistachToProps
)(Order);
