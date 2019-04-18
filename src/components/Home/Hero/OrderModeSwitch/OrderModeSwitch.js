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
                    <div className={`${styles.basic} ${this.props.orderMode === 'BASIC' ? styles.active : ''}`}>
                        <h3 onClick={() => this.props.changeOrderMode('BASIC')}>Simple</h3>
                    </div>
                    <div className={`${styles.pro} ${this.props.orderMode === 'ORDER_BOOK' ? styles.active : ''}`}>
                        <h3 onClick={() => this.props.changeOrderMode('ORDER_BOOK')}>Advanced</h3>
                    </div>
                  </div>
                </div>
        )}
      </I18n>
    );
  }
}

export default OrderModeSwitch;
