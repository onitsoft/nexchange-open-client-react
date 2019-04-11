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
        expandedOrder: '',
        loading: true
    };

    this.fetchMyOrders = this.fetchMyOrders.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
  }

  componentWillMount() {
    this.fetchMyOrders();
    this.interval = setInterval(() => {
        this.fetchMyOrders();
    }, config.ORDER_BOOK_FETCH_INTERVAL)
  }

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  viewDetails(orderId) { 
    this.setState({expandedOrder: orderId});
  }


  hideDetails(orderId) {    
    this.setState({expandedOrder: ''});
  }

  fetchMyOrders = () => {
    if(localStorage.limitOrderHistory){
        const limitOrderHistory = localStorage.limitOrderHistory.split(",");
        let orders = [];
        limitOrderHistory.forEach((orderId) => {
            const url = `${config.API_BASE_URL}/limit_order/${orderId.replace(/"/g,"")}/`;
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
      }
  }

  componentWillUnmount() {
  }

  render() {
    return (
        <I18n ns="translations">
          {(t, i18n) => (
            <div className={`col-xs-12 col-sm-12 col-md-14 col-lg-4 ${styles.container}`}>
                <h4 className={styles.title}>{`My Orders`}</h4>
                {_.isEmpty(this.props.orderBook.myOrders) ? <span>No order history...</span> :
                <div className={`${styles.list}`}> 
                 {this.props.orderBook.myOrders.map((order) => {
                       return (<div className={`${styles['list-item']}`} key={order.unique_reference}>
                              <div className={`${styles['heading']}`}>
                                <div className={`col-xs-8 col-sm-8 col-md-6 col-lg-8`}>
                                  <h5>{`(${order.book_status_name[0][1]}) ${order.order_type == 1 ? 'Buy' : 'Sell'} 
                                  ${order.pair.base.code} - ${order.pair.quote.code}`}</h5>
                                  <span>{new moment(order.created_on).locale(`${i18n.language}`).fromNow()}</span>
                                </div>
                                <div className={`col-xs-4 col-sm-4 col-md-6 col-lg-4`}>
                                {this.state.expandedOrder === order.unique_reference 
                                ? <a onClick={() => this.hideDetails(order.unique_reference)}>Hide details</a>
                                : <a onClick={() => this.viewDetails(order.unique_reference)}>View details</a>
                                }
                                </div>
                              </div>
                              {this.state.expandedOrder === order.unique_reference ?
                                <div className={`col-xs-12 ${styles['details']}`}>
                                  <div className={styles['field']}>
                                    <span className={styles['label']}>Order Reference</span>
                                    <span className={styles['value']}>{order.unique_reference}</span>
                                  </div>
                                  <div className={styles['field']}>
                                    <span className={styles['label']}>Quantity</span>
                                    <span className={styles['value']}>{`${parseFloat(order.amount_base)} ${order.pair.base.code}`}</span>
                                  </div>
                                  <div className={styles['field']}>
                                    <span className={styles['label']}>Limit Rate</span>
                                    <span className={styles['value']}>{`${parseFloat(order.limit_rate)} ${order.pair.quote.code}`}</span>
                                  </div>
                                  <div className={styles['field']}>
                                    <span className={styles['label']}>{`Deposit Address (${order.deposit_address.currency_code})`}</span>
                                    <span className={styles['value']}>{`${order.deposit_address.address}`}</span>
                                  </div>
                                  <div className={styles['field']}>
                                    <span className={styles['label']}>{`Withdraw Address (${order.withdraw_address.currency_code})`}</span>
                                    <span className={styles['value']}>{`${order.withdraw_address.address}`}</span>
                                  </div>
                                  {order.book_status_name[0][0] == 0 
                                  ? <span className={styles['obs']}>
                                    {`To open your limit order please send 
                                    ${order.order_type === 1 ? parseFloat(order.amount_quote) : parseFloat(order.amount_base)} 
                                    ${order.deposit_address.currency_code} to the deposit address`}</span>
                                  : null}
                                </div>  
                              : null}
                            </div>)
                 })}
                </div>
                }
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
