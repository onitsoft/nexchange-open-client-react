import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import { changeOrderBookValue } from 'Actions/index.js';

import styles from './OrderDepthItem.scss';

class OrderDepthItem extends PureComponent {
  constructor(){
    super();

    this.setOrderBookQuantity = this.setOrderBookQuantity.bind(this);
    this.setOrderBookLimitRate = this.setOrderBookLimitRate.bind(this);
    this.getMyOrderSize = this.getMyOrderSize.bind(this);
  }

  setOrderBookQuantity(quantity) {
    const orderBook = this.props.orderBook;
    orderBook.quantity = quantity;
    this.props.changeOrderBookValue(orderBook);
  }

  setOrderBookLimitRate(limit_rate) {
    const orderBook = this.props.orderBook;
    orderBook.limit_rate = limit_rate;
    this.props.changeOrderBookValue(orderBook);
  }


  getMyOrderSize(limit_rate) {
    const myOrders = this.props.orderBook.myOrders;
    const order_type = this.props.side === "SELL" ? 0 : 1;
    const myMatchingOrders = _.filter(myOrders, order => 
        order.book_status_name[0][1] === 'OPEN'
        && order.order_type === order_type 
        && parseFloat(order.limit_rate) === parseFloat(limit_rate));

    if(_.isEmpty(myMatchingOrders)){return;}
    
    const size =  _.sumBy(myMatchingOrders, order => parseFloat(order.amount_base));
    return size;
  }

  render() {  
      const item = this.props.item;
      const myOrderSize = this.getMyOrderSize(item.rate);
      return (
      <I18n ns="translations">
        {t => (
          <div className={`${styles.container} ${styles[this.props.side]}`}>
            <a onClick={() => this.setOrderBookQuantity(item.size)} to
            className={`clickable ${myOrderSize ? 'bold' : '' }`}
            title={`My size: ${myOrderSize ? `${myOrderSize} ${this.props.selectedCoin.receive}` : null}`}
            >
              {`${item.size.toFixed(9)}`}
            </a>
            <a onClick={() => this.setOrderBookLimitRate(item.rate)} 
            className={`clickable ${myOrderSize ? 'bold' : '' }`}
            title={`My size: ${myOrderSize ? `${myOrderSize} ${this.props.selectedCoin.receive}` : null}`}
            >
              {(item.rate).toFixed(9)}
            </a>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ orderBook, selectedCoin }) => ({ orderBook, selectedCoin });
const mapDispatchToProps = dispatch => bindActionCreators({ changeOrderBookValue }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDepthItem);
