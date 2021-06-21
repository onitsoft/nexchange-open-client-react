import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { fetchOrder, fetchPrice, setOrder, fetchCoinDetails, resetWallet } from 'Actions';

import OrderMain from './OrderMain/OrderMain';
import OrderTop from './OrderTop/OrderTop';

import OrderLoading from './OrderLoading/OrderLoading';
import OrderCoinsProcessed from './OrderCoinsProcessed/OrderCoinsProcessed';
import OrderCta from './OrderCta/OrderCta';
import withOrderDataProvider from './withOrderDataProvider';

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

  componentWillUnmount() {
    this.props.resetWallet();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ order: nextProps.order });
    
    if (nextProps.order !== 429) {
      this.setState({ order: nextProps.order });

      if (
        this.props.order &&
        this.props.order.status_name.length > 0 &&
        this.props.order.status_name[0][0] === 11 &&
        nextProps.order.status_name[0][0] === 12
      ) {
        window.gtag('event', 'Order paid', { event_category: 'Order', event_label: `${nextProps.unique_reference}` });
      }
    }
  }

  render() {
    return (
      <div className={`${styles.container} ${this.state.order && this.state.order.isFiat ? 'order-fiat' : 'order-crypto'}`}>
        <div className="container">
          <div className="row">
            {(this.state.order == null && <OrderLoading />) ||
              (this.state.order === 404 && <Redirect to="/not-found" />) ||
              (typeof this.state.order === 'object' && (
                <>
                  <OrderTop order={this.state.order} />
                  <OrderCoinsProcessed order={this.state.order} />

                  <OrderMain {...this.props} />
                  <OrderCta order={this.state.order} />
                </>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ order, price }) => ({ order, price });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchOrder, fetchPrice, setOrder, fetchCoinDetails, resetWallet }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withOrderDataProvider(Order));
