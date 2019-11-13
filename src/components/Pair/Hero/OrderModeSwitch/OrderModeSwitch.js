import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import styles from './OrderModeSwitch.scss';

class OrderModeSwitch extends Component {
  render() { 
    return (
      <I18n ns="translations">
        {t => (
          <div className={`col-xs-12`}>
            <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-3 ${styles.container}`}>
              <a className={`${styles.basic} ${this.props.orderMode === 'INSTANT' ? styles.active : ''}`}
                onClick={() => this.props.changeOrderMode('INSTANT')} data-test='INSTANT'>
                  <h3>{t('ordermodeswitch.simple')}</h3>
              </a>
              <a className={`${styles.pro} ${this.props.orderMode === 'ORDER_BOOK' ? styles.active : ''}`}
                onClick={() => this.props.changeOrderMode('ORDER_BOOK')} data-test='ORDER_BOOK'>
                  <h3>{t('ordermodeswitch.advanced')}</h3>
              </a>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default OrderModeSwitch;
