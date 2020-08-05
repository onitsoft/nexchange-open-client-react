import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { fetchOrder, fetchPrice, setOrder, fetchCoinDetails } from 'Actions';

import isFiatOrder from 'Utils/isFiatOrder';
import config from 'Config';

import OrderMain from './OrderMain/OrderMain';
import OrderTop from './OrderTop/OrderTop';

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
    this.props.fetchCoinDetails();
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
      ) 
      {
        if (this.props.order.isFiatOrder)
        {
          window.gtag('event', 'Order paid fiat', {event_category: 'Order', event_label: `${this.props.order.pair.quote.code}`});
        }
        else
        {
          window.gtag('event', 'Order paid crypto', {event_category: 'Order', event_label: `${this.props.order.pair.quote.code}`})
        }
      }
    }
  }

  render() {
    return (
      <div className={`${styles.container} ${this.state.order && (isFiatOrder(this.state.order) ? 'order-fiat' : 'order-crypto')}`}>
        <div className="container">
          <div className="row">
            {
              ((this.state.order == null) && <OrderLoading />)
              || ((this.state.order === 404) && <Redirect to='/not-found' />)
              || ((typeof this.state.order === 'object') && <>
                <OrderTop order={this.state.order} />
                <OrderCoinsProcessed order={this.state.order} />

                <OrderMain {...this.props} />
                <OrderCta order={this.state.order} />
                </>)
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ order, price }) => ({ order, price });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchOrder, fetchPrice, setOrder, fetchCoinDetails }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
