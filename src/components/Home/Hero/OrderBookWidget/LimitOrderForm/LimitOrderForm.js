import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import debounce from 'Utils/debounce';
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

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.orderBook.quantity !== this.state.quantity) {
      this.setState({ quantity: nextProps.orderBook.quantity });
    }
    if (nextProps.orderBook.limit_rate !== this.state.limit_rate) {
      this.setState({ quantity: nextProps.orderBook.limit_rate });
    }
  };

  handleQuantityChange = event => {
    let { value } = event.target;
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');
    this.setState({ quantity: value });

    const setOrderBookQuantity = debounce(value => {
      const orderBook = this.props.orderBook;
      orderBook.quantity = value;
      this.props.changeOrderBookValue(orderBook);
    }, 600);
    setOrderBookQuantity(value);
    // window.gtag('event', 'Change quantity', {event_category: 'Order Book', event_label: ``});
  };


  handleLimitRateChange = event => {
    let { value } = event.target;
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');
    this.setState({ limit_rate: value });

    const setOrderBookLimitRate = debounce(value => {
      const orderBook = this.props.orderBook;
      orderBook.limit_rate = value;
      this.props.changeOrderBookValue(orderBook);
    }, 600);
    setOrderBookLimitRate(value);
    // window.gtag('event', 'Change limit rate', {event_category: 'Order Book', event_label: ``});
  };

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={`col-xs-12`}>
            <form>
            <input
                type="text"
                className={`form-control ${styles.input}`}
                id="quantity"
                value={this.state.quantity}
                onChange={event => this.handleQuantityChange(event)}
                autoComplete="off"
                placeholder={`Quantity (${this.props.selectedCoin.deposit})`}              
              />
              <input
                type="text"
                className={`form-control ${styles.input}`}
                id="limit-rate"
                value={this.state.limit_rate}
                onChange={event => this.handleLimitRateChange(event)}
                autoComplete="off"
                placeholder={`Limit Rate (${this.props.selectedCoin.receive})`}              
              />
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
