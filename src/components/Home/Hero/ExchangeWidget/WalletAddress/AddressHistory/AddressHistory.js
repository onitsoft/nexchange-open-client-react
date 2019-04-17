import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import moment from 'moment/min/moment-with-locales.min.js';
import 'moment/locale/en-gb';
import styles from './AddressHistory.scss';


const DEFAULT_SHOW_COUNT = 5;

class AddressHistory extends Component {
  constructor(props) {
    super(props);

    this.state = { showCount: DEFAULT_SHOW_COUNT };
  }


  handleClick(depositCoin, receiveCoin, address) {
    this.props.setCoin(depositCoin, receiveCoin);
    this.props.setAddress(address);

    window.gtag('event', 'Set Address', {event_category: 'Order History', event_label: `${receiveCoin} - ${address}`});
  }

  orderClick(event, orderId) {
    event.preventDefault();
    event.stopPropagation();

    window.open(`/order/${orderId}`, '_blank')
  }

  showMore(event){
    event.preventDefault();
    event.stopPropagation();

    const showCount = this.state.showCount + DEFAULT_SHOW_COUNT;
    this.setState({showCount});
  }


  render() {
    if(_.isEmpty(this.props.history)) {
      return null;
    }

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className={`${styles.container}`}>
            <div className={`${styles.entryContainer}`}>
              {this.props.history &&
                this.props.history.slice(0,this.state.showCount).map((order, index) => (
                  <div
                  className={`${styles.entry}`} key={index + order.withdraw_address}
                  onMouseDown={() => this.handleClick(order.base, order.quote, order.withdraw_address)}>
                    {order.withdraw_address}
                    <div className={`${styles.details}`}>
                      {`${order.base} ${t('to')} ${order.quote}`}
                      {` ${new moment(order.created_at).locale(`${i18n.language}`).fromNow()} `}
                      (<a
                        onMouseDown={(event) => this.orderClick(event, order.id)}
                        title={`${order.amount_base}${order.base} to ${order.amount_quote}${order.quote}`} >
                        {`${order.id}`}
                      </a>)
                    </div>
                  </div>
                ))
              }
              </div>
            <div className={`${styles.separator}`}></div>
            { this.props.history && this.props.history.length > this.state.showCount ?
            <div className={`${styles.showMore}`}>
              <a onMouseDown={(event) => this.showMore(event)}>{t('viewmore')}</a>
            </div> : null }
          </div>
        )}
       </I18n>
    );
  }
}

export default AddressHistory;
