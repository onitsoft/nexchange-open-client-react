import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import axios from 'axios';
import config from 'Config';
import moment from 'moment';

import styles from './MyOrders.scss';


class MyOrders extends PureComponent {
  constructor(props) {
    super();

    this.state = {
        orders: [],
        loading: true
    };

    this.fetchMyOrders = this.fetchMyOrders.bind(this);
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
                orders = _.sortBy(orders, 'created_at').reverse();
                if(orders.length === limitOrderHistory.length){
                    this.setState({orders, loading: false});
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
            <div className={`col-xs-12 ${styles.container}`}>
                <h4 className={``}>{`My Orders`}</h4>
                { <div className={`${styles.list}`}> {this.state.orders.map((order) => {
                    return (<div className={`${styles['list-item']}`} key={order.unique_reference}>
                            <p>{`Unique Reference: ${order.unique_reference}`}</p>
                            {order.book_status_name ?
                            <p>{`Status: ${order.book_status_name[0][1]}`}</p>
                            : null}
                            <p>{`Created: ${new moment(order.created_on).locale(`${i18n.language}`).fromNow()} `}</p>
                            <p>{`Withdraw Address: ${order.withdraw_address.address} 
                            (${order.withdraw_address.currency_code})`}</p>
                            <p>{`Deposit Address: ${order.deposit_address.address} 
                            (${order.deposit_address.currency_code})`}</p>
                            {order.status_name[0][1] === 'INITIAL' ? 
                            <span>{`In order to complete your order, send ${order.amount_base} 
                            ${order.deposit_address.currency_code}
                            to the deposit address`}</span> : null}
                            </div>);})}</div>}
                    </div>
          )}
        </I18n>
    );     
  }
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrders);
