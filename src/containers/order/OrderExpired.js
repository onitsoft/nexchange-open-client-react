import React, { Component } from 'react';
import { I18n } from 'react-i18next';

class OrderExpired extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    return (
	<I18n ns="translations">
	 {(t) => (
      <div className="text-center">
		<h2>{t('order.expired1')}</h2>
		<h5>{t('order.expired2')}</h5>

        <h4
          className="text-warning"
          data-toggle="tooltip"
          data-placement="top"
          data-original-title={t('order.expired3')}
          style={{ margin: '25px 0 5px 0', fontWeight: 500 }}
        >
          {t('order.expired4')}
        </h4>
      </div>
	  )}
	 </I18n>
    );
  }
}

export default OrderExpired;
