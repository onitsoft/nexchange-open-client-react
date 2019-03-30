import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import moment from 'moment/min/moment-with-locales.min.js';
import 'moment/locale/en-gb';
import styles from './AddressHistory.scss';


class AddressHistory extends Component {
  handleClick(coin, address) {
    this.props.setCoin(coin);
    this.props.setAddress(address);

    window.gtag('event', 'Set Address', {event_category: 'Order History', event_label: `${coin} - ${address}`});
  }

  orderClick(event, orderId) {
    event.preventDefault();
    event.stopPropagation();

    window.open(`/order/${orderId}`, '_blank')
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className={`${styles.container}`}>
            <div className={`${styles.entryContainer}`}>
              {this.props.history &&
                this.props.history.map((order, index) => (
                  <div
                  className={`${styles.entry}`} key={index + order.withdraw_address}
                  onMouseDown={() => this.handleClick(order.quote, order.withdraw_address)}>
                    {order.withdraw_address}
                    <div className={`${styles.details}`}>
                      {`${order.quote} `} (<a onMouseDown={(event) => this.orderClick(event, order.id)}>{`${order.id}`}</a>)
                      {` ${new moment(order.created_at).locale(`${i18n.language}`).fromNow()}`}
                    </div>
                  </div>
                ))
              }
              </div>
            <div className={`${styles.separator}`}></div>
          </div>
        )}
       </I18n>
    );
  }
}

export default AddressHistory;
