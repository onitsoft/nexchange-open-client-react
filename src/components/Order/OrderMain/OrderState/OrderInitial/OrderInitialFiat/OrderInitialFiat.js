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

        <label>
          <input type="checkbox" name="checkboxTC" id="checkboxTC" value="check" style={{ width: '20px', height: '20px', }}
          onClick={function togglePayNowButton() {
              let _checkoutButton = document.getElementsByName("checkoutButton")[0];
              let _box = document.getElementsByName("checkboxTC")[0];
              let _box_kyc = document.getElementsByName("checkboxKYC")[0];
              let _paymentUrl = props.order.payment_url;
              if (_box.checked && _box_kyc.checked) {
                  _checkoutButton.href = _paymentUrl;
                  _checkoutButton.classList.remove("disabled");
              } else {
                  _checkoutButton.removeAttribute("href");
                  _checkoutButton.classList.add("disabled");
              }
          }}/>
          <strong style={{paddingLeft: "7px"}} dangerouslySetInnerHTML={{__html: t('order.iAgreedTC')}}/>
        </label>

        <label>
        <input type="checkbox" name="checkboxKYC" id="checkboxKYC" value="check" style={{ width: '20px', height: '20px', }}
        onClick={function togglePayNowButton() {
            let _checkoutButton = document.getElementsByName("checkoutButton")[0];
            let _box = document.getElementsByName("checkboxTC")[0];
            let _box_kyc = document.getElementsByName("checkboxKYC")[0];
            let _paymentUrl = props.order.payment_url;
            if (_box.checked && _box_kyc.checked) {
                _checkoutButton.href = _paymentUrl;
                _checkoutButton.classList.remove("disabled");
            } else {
                _checkoutButton.removeAttribute("href");
                _checkoutButton.classList.add("disabled");
            }
        }}/>
            <strong style={{paddingLeft: "7px"}}>{t('order.iAcknowledgeKYC')}</strong>
        </label>


        <a target="_blank" className="btn btn-default btn-lg disabled" name="checkoutButton" data-toggle="tooltip"
           title={t('order.tooltipTC')} style={{ pointerEvents: 'auto'}}>
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
