import React, { Component } from 'react';
import { I18n, Trans } from 'react-i18next';


import styles from './OrderModeSwitch.scss';

class OrderModeSwitch extends Component {
  render() { 
    return (
      <I18n ns="translations">
        {t => (
                <div className={styles.container}>
                    <div className={`${styles.basic} ${this.props.orderMode === 'BASIC' ? styles.active : ''}`}>
                        <h3 onClick={() => this.props.changeOrderMode('BASIC')}>Simple</h3>
                    </div>
                    <div className={`${styles.pro} ${this.props.orderMode === 'ORDER_BOOK' ? styles.active : ''}`}>
                        <h3 onClick={() => this.props.changeOrderMode('ORDER_BOOK')}>Pro</h3>
                    </div>
                </div>
        )}
      </I18n>
    );
  }
}

export default OrderModeSwitch;
