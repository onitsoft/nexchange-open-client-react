import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import moment from 'moment';
import getDaysAgo from 'Utils/getDaysAgo';
import styles from './AddressHistory.scss';


class AddressHistory extends Component {
  handleClick(coin, address) {
    this.props.setCoin(coin);
    this.props.setAddress(address);
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={`${styles.container}`}>
            <div className={`${styles.entryContainer}`}>
              {this.props.history &&
                this.props.history.map((order, index) => (
                  <div
                  className={`${styles.entry}`} key={index + order.withdraw_address}
                  onMouseDown={() => this.handleClick(order.quote,order.withdraw_address)}>
                    {order.withdraw_address}
                    <div className={`${styles.details}`}>
                      {`(${order.quote}) ${t('order.history.used')}: ${getDaysAgo(order.created_at) > 0 ?
                        `${getDaysAgo(order.created_at)} ${t('order.history.daysago')}` : `${t('order.history.today')}`} `}
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
