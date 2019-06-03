import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import { fetchPairs, selectCoin, fetchOrderBook} from 'Actions';
import config from 'Config';

import styles from './OrderOpen.scss';
import OrderDepth from '../../../../Home/Hero/OrderBookWidget/OrderDepth/OrderDepth';
import MyOrders from '../../../../Home/Hero/OrderBookWidget/MyOrders/MyOrders';

class OrderOpen extends Component {
    UNSAFE_componentWillMount() {
        this.props.fetchPairs();
    }

    UNSAFE_componentWillUpdate(nextProps) {
        const order = this.props.order;
        if(!order){return;}
        const changedOrder = order.unique_reference !== nextProps.order.unique_reference;
        const selectCoinEqualOrderCoin = `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}` === order.pair.name;
        if(!_.isEmpty(order) && !_.isEmpty(this.props.pairs) && (changedOrder || !selectCoinEqualOrderCoin)) {
            this.props.selectCoin({
                ...this.props.selectedCoin,
                deposit: order.pair.quote.code,
                receive: order.pair.base.code,
                selectedByUser: false,
              }, this.props.pairs);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if((this.props.selectedCoin && this.props.selectedCoin.receive !== prevProps.selectedCoin.receive) || 
          (this.props.selectedCoin.deposit !== prevProps.selectedCoin.deposit)) {
            clearInterval(this.interval);
            this.fetchOrderBook();
        }
    }    

    fetchOrderBook = () => {
        const fetch = () => {
          const pair = `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`;
          const orderBook = this.props.orderBook;
          const payloads = [{
            orderBook,
            pair,
            type: 'SELL',
            status: 'OPEN'
          },{
            orderBook,
            pair,
            type: 'BUY',
            status: 'OPEN'
          },{
            orderBook,
            pair,
            status: 'CLOSED'
          }]
          payloads.forEach((payload) => this.props.fetchOrderBook(payload));
        }
    
        fetch();
        this.interval = setInterval(() => {
          fetch();
        }, config.ORDER_BOOK_FETCH_INTERVAL);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        const order = this.props.order;
        return (
                <I18n ns="translations">
                   {t => (<div className={`${styles.container}`}>
                      <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-4 ${styles['order-data']}`}>
                        <p className={styles[order.order_type_name[0][1]]}>
                          <span>{`${t('orderbookwidget.side')}: `}</span>
                          {order.order_type_name[0][1]}
                        </p>
                        <p>
                        <span>{`${t('orderbookwidget.quantity')}: `}</span>
                          {order.amount_base} {order.pair.base.code}
                        </p>
                        <p>
                          <span>{`${t('orderbookwidget.limitprice')}: `}</span>
                          {order.limit_rate} {order.pair.quote.code}
                        </p>
                        </div>
                        <OrderDepth />
                        <MyOrders shouldRedirect={true}/>
                       </div>
                )}</I18n>)
    }
}

const mapStateToProps = ({ pairs, selectedCoin, orderBook }) => ({ pairs, selectedCoin, orderBook });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchPairs, selectCoin, fetchOrderBook }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderOpen);
