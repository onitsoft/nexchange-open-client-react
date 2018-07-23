import React from 'react';
import { I18n } from 'react-i18next';
import styles from '../OrderInitial.scss';

const OrderInitial = props => {
  return (
   <I18n ns="translations">
	{(t) => (
    <div id="order-payment" className={`row ${styles.container}`}>
      <div id="order-payment-details" className="col-xs-12 col-ms-6 col-sm-6 col-md-4">
        <h3>
          {t('order.initial1')}:{' '}
          <span className={styles.time}>
            <b>{props.time}</b>
          </span>
        </h3>
        <h4>
          {t('order.pay')}{' '}
          <b>
            {parseFloat(props.order.amount_quote)} {props.order.pair.quote.code}
          </b>
        </h4>
        <a href={props.order.payment_url} target="_blank" className="btn btn-default btn-lg">
          <i className="fas fa-credit-card" aria-hidden="true" style={{ position: 'relative', left: -13 }} />
          {t('order.fiat.status.pay')}
        </a>
      </div>

      <div className={`col-xs-12 col-ms-6 col-sm-6 col-md-8 ${styles.cards}`}>
        <h3>{t('order.fiat.cards')}:</h3>

        <div className="visible-xs-block visible-sm-block">
          <img src="/img/order/cards-mobile.png" alt={t('order.fiat.cardsaccepted')} />
        </div>

        <div className="visible-md-block visible-lg-block">
          <img src="/img/order/cards-desktop.png" alt={t('order.fiat.cardsaccepted')} />
        </div>
      </div>
    </div>
	)}
   </I18n>
  );
};

export default OrderInitial;
