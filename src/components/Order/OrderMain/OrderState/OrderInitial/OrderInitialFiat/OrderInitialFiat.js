import React, { Component, Fragment } from 'react';
import { I18n } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';

import Checkbox from '../Checkbox/Checkbox';
import styles from '../OrderInitial.scss';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import OrderPreReleased from '../../OrderPreReleased/OrderPreReleased';
import OrderFailed from '../../OrderFailure/OrderFailure';
import config from '../../../../../../config';

const PaymentNewTabText = styled.h4`
  text-align: center;
  padding: 2rem 0 0.75rem;
`;

const PaymentIframeContainer = styled.div`
  position: relative;
  iframe {
    position: relative;
  }
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class OrderInitial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHuman: false,
      isPaymentEnabled: true,
      showPaymentIFrame: false,
      paymentStatus: 'pending',
    };

    this.setIsHuman = this.setIsHuman.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.paymentStatus !== nextState.paymentStatus || this.state.isHuman !== nextState.isHuman) {
      return true;
    }

    const currentPaymentURL = removeUnnecessaryURLParams(this.props.order.payment_url);
    const nextPaymentURL = removeUnnecessaryURLParams(nextProps.order.payment_url);

    return !(this.state.showPaymentIFrame && currentPaymentURL === nextPaymentURL);
  }

  togglePaymentIFrame() {
    this.setState({
      showPaymentIFrame: !this.state.showPaymentIFrame,
    });

    if (!localStorage.termsAgreed) {
      localStorage.setItem('termsAgreed', JSON.stringify({ on: Date.now(), order: this.props.order.unique_reference }));
    }
  }

  toggleEnablePayment = status => {
    this.setState({
      enablePayment: status,
    });
  };

  iFrameMessage = e => {
    if (e.origin === 'https://secure.safecharge.com') {
      const data = JSON.parse(e.data);
      console.log('data iMessage', data);

      if (['success', 'error', 'canceledByUser'].includes(data)) {
        this.setState({ paymentStatus: data });

        if (data === 'error') {
          document.querySelector('#safecharge_payment_iframe').src = this.props.order.payment_url;
        }

        if (data === 'canceledByUser') {
          window.location.reload();
        }
      }
    }
  };

  componentDidMount() {
    const safechargeStatus = getUrlPram('ppp_status');
    if (!_.isEmpty(safechargeStatus)) {
      $('body').hide();
    }

    if (localStorage.termsAgreed) this.setState({ showPaymentIFrame: true });

    window.addEventListener('message', this.iFrameMessage);
  }

  UNSAFE_componentWillUpdate() {
    const safechargeStatus = getUrlPram('ppp_status');
    if (!_.isEmpty(safechargeStatus)) {
      if (this.props.order && this.props.order.payment_url) {
        if (safechargeStatus === 'OK') {
          $('body').replaceWith(`<div class="loader-container"><div class="loader"></div></div>`);
        } else {
          $('html').replaceWith(`<iframe title='SafeCharge Payment' src=${this.props.order.payment_url} height=500 width='100%' />`);
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.iFrameMessage);
  }

  setIsHuman(value) {
    if (value) {
      this.setState({
        isHuman: true,
      });
    }
  }

  render() {
    const { paymentStatus, showPaymentIFrame, isPaymentEnabled, isHuman } = this.state;
    if (paymentStatus === 'success') return <OrderPreReleased />;

    const { time, order } = this.props;
    const { payment_url, amount_quote, pair } = order;

    const PaymentIFrame = () => {
      return (
        <Fragment>
          <PaymentNewTabText>
            <a href={payment_url} target="_blank" rel="noopener noreferrer">
              Open payment window in new tab
            </a>
          </PaymentNewTabText>
          <PaymentIframeContainer>
            <Spinner>
              <img src="/img/spinner.gif" alt="" />
            </Spinner>
            <iframe
              title="SafeCharge"
              id="safecharge_payment_iframe"
              src={payment_url}
              height={620}
              width={'100%'}
              scrolling="no"
              style={{ border: 'none' }}
            />
          </PaymentIframeContainer>
        </Fragment>
      );
    };

    return (
      <Fragment>
        {/*if payment_url is null, show error. payment_url can be null because of token mismatch */}
        {payment_url ? (
          <div>
            <Helmet>
              <link rel="preload" href={payment_url} as="document" />
            </Helmet>

            {showPaymentIFrame ? (
              <Fragment>
                {isHuman ? (
                  <PaymentIFrame />
                ) : (
                  <ReCAPTCHA
                    style={{ width: '40%', margin: 'auto', padding: '25px' }}
                    sitekey={config.RECAPTCHA_SITE_KEY_FIAT_PAYMENT}
                    onChange={this.setIsHuman}
                  />
                )}
              </Fragment>
            ) : (
              <I18n ns="translations">
                {t => (
                  <div id="order-payment" className={`row ${styles.container}`}>
                    <div id="order-payment-details" className="col-xs-12 col-ms-6 col-sm-6 col-md-6">
                      {time !== '00:00' && (
                        <h3>
                          {t('order.initial1')}:{' '}
                          <span className={styles.time}>
                            <b>{time}</b>
                          </span>
                        </h3>
                      )}
                      <h4>
                        {t('order.pay')}{' '}
                        <b>
                          {parseFloat(amount_quote)} {pair.quote.code}
                        </b>
                      </h4>

                      <Checkbox onTogglePayment={this.toggleEnablePayment} name="checkboxTC" order="order.iAgreedTC" />
                      <Checkbox onTogglePayment={this.toggleEnablePayment} name="checkboxKYC" order="order.iAcknowledgeKYC" />

                      <a
                        className="btn btn-default btn-lg"
                        name="checkoutButton"
                        data-toggle="tooltip"
                        title={isPaymentEnabled ? '' : t('order.tooltipTC')}
                        style={{ pointerEvents: 'auto' }}
                        onClick={() => {
                          payment_url && isPaymentEnabled && this.togglePaymentIFrame();
                        }}
                      >
                        <i className="fas fa-credit-card" aria-hidden="true" style={{ position: 'relative', left: -13 }} />
                        {t('order.fiat.status.pay')}
                      </a>
                    </div>

                    <div className={`col-xs-12 col-ms-6 col-sm-6 col-md-6 ${styles.cards}`}>
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
            )}
          </div>
        ) : (
          <OrderFailed title="error.notfound1" />
        )}
      </Fragment>
    );
  }
}

const removeUnnecessaryURLParams = url => {
  url = removeURLParam(url, 'notify_url');
  url = removeURLParam(url, 'checksum');
  url = removeURLParam(url, 'time_stamp');
  return url;
};

const removeURLParam = (url, parameter) => {
  if (!_.isEmpty(url) && !_.isEmpty(parameter)) {
    //prefer to use l.search if you have a location/link object
    const urlParts = url.split('?');
    if (urlParts.length >= 2) {
      const prefix = encodeURIComponent(parameter) + '=';
      const pars = urlParts[1].split(/[&;]/g);

      //reverse iteration as may be destructive
      for (let i = pars.length; i-- > 0; ) {
        //idiom for string.startsWith
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1);
        }
      }

      return urlParts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
  }
  return url;
};

const getUrlPram = parameter => {
  const url_string = window.location.href;
  const url = new URL(url_string);
  return url.searchParams.get(parameter);
};

export default OrderInitial;
