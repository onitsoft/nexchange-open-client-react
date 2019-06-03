import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import config from 'Config';
import { changeOrderBookValue } from 'Actions/index.js';

import MyOrdersCollapsed from './MyOrdersCollapsed/MyOrdersCollapsed';
import styles from './MyOrders.scss';
import MyOrdersExpanded from './MyOrdersExpanded/MyOrdersExpanded';


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
          orderHistory = orderHistory ? JSON.parse(orderHistory).reverse() : [];          
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
    if(this.state.redirect) {
      return <Redirect push to="/?advanced=true&myorders=true" />;
    }
    
    if(this.props.expanded) {
        return (
          <div className={`col-xs-12 ${styles.wrapper}`}> 
            <MyOrdersExpanded 
              myOrders={this.props.orderBook.myOrders} 
              collapseMyOrders={this.props.collapseMyOrders}/>
          </div>
        );
      } else {
        return (
          <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-4 ${styles.wrapper}`}> 
            <MyOrdersCollapsed 
              myOrders={this.props.orderBook.myOrders} 
              expandMyOrders={this.props.expandMyOrders} 
              goToMyOrders={() => this.setState({redirect: true})}
              shouldRedirect = {this.props.shouldRedirect}
              />
          </div>
        );
      }   
  }
}

const mapStateToProps = ({ orderBook }) => ({ orderBook });
const mapDispatchToProps = dispatch => bindActionCreators({ changeOrderBookValue }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrders);
