import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import axios from 'axios';
import config from 'Config';
import moment from 'moment';
import { changeOrderBookValue } from 'Actions/index.js';

import styles from './MyOrders.scss';


class MyOrders extends PureComponent {
  constructor(props) {
    super();

    this.state = {
        loading: true
    };

    this.fetchMyOrders = this.fetchMyOrders.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.fetchMyOrders();
    this.interval = setInterval(() => {
        this.fetchMyOrders();
    }, config.ORDER_BOOK_FETCH_INTERVAL)
  }

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  fetchMyOrders = () => {
    if(localStorage.orderHistory){
        try {
          let orderHistory = localStorage['orderHistory'];
          orderHistory = orderHistory ? _.uniqBy(JSON.parse(orderHistory).reverse(), 'withdraw_address') : [];          
          const limitOrderHistory = _.filter(orderHistory, { 'mode': 'LIMIT' });
          let orders = [];
          limitOrderHistory.forEach((order) => {
              const url = `${config.API_BASE_URL}/limit_order/${order.id.replace(/"/g,"")}/`;
              const request = axios.get(url);
              request
              .then(res => {
                  orders.push(res.data);
                  orders = _.sortBy(orders, function(order) {
                    return new Date(order.created_on);
                  }).reverse();
                  if(orders.length === limitOrderHistory.length){
                      const orderBook = this.props.orderBook;
                      orderBook.myOrders = orders;
                      this.props.changeOrderBookValue(orderBook)
                      this.setState({ loading: false });
                  }
              })
              .catch(error => {
                  console.log(error);
              });
          });
        } catch (e) {
          this.orderHistory = [];
        }
      }
  }

  render() {
    const myOrdersList = <div>
                          {this.props.orderBook.myOrders.map((order) => {
                            console.log(order);
                           return (<div>

                            </div>);
                          })}</div>;
    return (
        <I18n ns="translations">
          {(t, i18n) => (
         <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-4 ${styles.wrapper}`}>
          <div className={`${styles.container}`}>
            <div className={`${styles.heading}`}><h4>My Orders</h4></div>
            <div className={`${styles.content}`}>
            {_.isEmpty(this.props.orderBook.myOrders) 
              ? <p>No order history...</p>
              : myOrdersList}
            </div>
          </div>
         </div>
          )}
        </I18n>
    );     
  }
}

const mapStateToProps = ({ orderBook }) => ({ orderBook });
const mapDispatchToProps = dispatch => bindActionCreators({ changeOrderBookValue }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrders);
