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

  render() {
      const item = this.props.item;
      
      return (
      <I18n ns="translations">
        {t => (
          <div className={`${styles.container} ${styles[this.props.side]}`}>
            <span onClick={() => this.setOrderBookQuantity(item.size)} className={`clickable`}>{item.size.toFixed(9)}</span>
            <span onClick={() => this.setOrderBookLimitRate(item.rate)} className={`clickable`}>{(1/item.rate).toFixed(9)}</span>
            <span onClick={() => this.setOrderBookLimitRate(item.rate)} className={`clickable`}>{(item.rate).toFixed(9)}</span>
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
)(OrderDepthItem);
