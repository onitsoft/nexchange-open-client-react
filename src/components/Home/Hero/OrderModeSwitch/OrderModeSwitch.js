import React, { Component } from 'react';
import { I18n, Trans } from 'react-i18next';


import styles from './OrderModeSwitch.scss';

class OrderModeSwitch extends Component {
  render() { 
    return (
      <I18n ns="translations">
        {t => (

                <div className={`col-xs-12`}>
                  <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-3 ${styles.container}`}>
                    <a className={`${styles.basic} ${this.props.orderMode === 'BASIC' ? styles.active : ''}`}
                      onClick={() => this.props.changeOrderMode('BASIC')} data-test='BASIC'>
                        <h3>Simple</h3>
                    </a>
                    <a className={`${styles.pro} ${this.props.orderMode === 'ORDER_BOOK' ? styles.active : ''}`}
                      onClick={() => this.props.changeOrderMode('ORDER_BOOK')} data-test='ORDER_BOOK'>
                        <h3>Advanced</h3>
                    </a>
                  </div>
                </div>
        )}
      </I18n>
    );
  }
}

export default OrderModeSwitch;
