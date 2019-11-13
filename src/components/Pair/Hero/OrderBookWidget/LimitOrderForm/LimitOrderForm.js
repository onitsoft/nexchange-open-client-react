import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import styles from './LimitOrderForm.scss';

import { changeOrderBookValue } from 'Actions/index.js';


class LimitOrderForm extends PureComponent {
  constructor(props) {
    super();

    this.state = {
      quantity: '',
      limit_rate: '',
    };

  }


  handleQuantityChange = event => {
    let { value } = event.target;
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');

    const orderBook = this.props.orderBook;
    orderBook.quantity = value;
    this.props.changeOrderBookValue(orderBook);
    // window.gtag('event', 'Change quantity', {event_category: 'Order Book', event_label: ``});
  };


  handleLimitRateChange = event => {
    let { value } = event.target;
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');

    const orderBook = this.props.orderBook;
    orderBook.limit_rate = value;
    this.props.changeOrderBookValue(orderBook);
    // window.gtag('event', 'Change limit rate', {event_category: 'Order Book', event_label: ``});
  };


  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.orderBook.quantity !== this.state.quantity) {
      this.setState({ quantity: nextProps.orderBook.quantity });
    }
    if (nextProps.orderBook.limit_rate !== this.state.limit_rate) {
      this.setState({ limit_rate: nextProps.orderBook.limit_rate });
    }
  };

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={`col-xs-12`}>
            <form>
              <div className={'relative'}>
                <input
                  type="text"
                  ref={this.props.inputRef}
                  className={`form-control ${styles.input}`}
                  id="quantity"
                  value={this.state.quantity}
                  onChange={event => this.handleQuantityChange(event)}
                  autoComplete="off"
                  placeholder={t('orderbookwidget.quantitycoin', {coin: this.props.selectedCoin.receive})}              
                />
                {this.props.quantity > 0
                ? <span className={styles['input-label']}>
                  {t('orderbookwidget.quantitycoin', {coin: this.props.selectedCoin.receive})}
                  </span> 
                : null}
              </div>
              <div className={'relative'}>
                <input
                  type="text"
                  className={`form-control ${styles.input}`}
                  id="limit-rate"
                  value={this.state.limit_rate}
                  onChange={event => this.handleLimitRateChange(event)}
                  autoComplete="off"
                  placeholder={t('orderbookwidget.limitpricecoin', {coin: this.props.selectedCoin.deposit})}              
                />
                {this.props.limit_rate > 0
                ? <span className={styles['input-label']}>
                  {t('orderbookwidget.limitpricecoin', {coin: this.props.selectedCoin.deposit})}
                  </span> 
                : null}
              </div>
              <div className={styles['values-preview-container']}>
              {this.state.quantity && this.state.limit_rate ?
                <div id='values-preview' className={styles['values-preview']}>
                  <span>
                    {`${t('order.deposit')}: `}
                    {this.props.orderBook.order_type === 'BUY' 
                    ?`${(parseFloat((this.state.quantity)*parseFloat(this.state.limit_rate)))} ${this.props.selectedCoin.deposit}` 
                    : `${parseFloat(this.state.quantity)} ${this.props.selectedCoin.receive}`}
                  </span>
                  <span>
                  {`${t('order.receive')}: `}
                    {this.props.orderBook.order_type === 'BUY' 
                    ?`${parseFloat(this.state.quantity)} ${this.props.selectedCoin.receive}` 
                    : `${parseFloat((this.state.quantity*this.state.limit_rate))} ${this.props.selectedCoin.deposit}`}
                  </span>
                </div>
              : null}
              </div>
            </form>    
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
)(LimitOrderForm);
