import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import axios from 'axios';
import Checkbox from '../Checkbox/Checkbox';
import styles from '../OrderInitial.scss';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import OrderPreReleased from '../../OrderPreReleased/OrderPreReleased';
import OrderFailed from '../../OrderFailure/OrderFailure';
import config from 'Config';

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

const UserEmail = styled.div`
  input {
    width: 100%;
    max-width: 24rem;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
  }
  margin-bottom: 1.6rem;
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
      enablePayment: true,
      showPaymentIFrame: false,
      paymentStatus: 'pending',
      userEmail: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentPaymentURL = removeUnnecessaryURLParams(this.props.order.payment_url);
    const nextPaymentURL = removeUnnecessaryURLParams(nextProps.order.payment_url);

    if (this.state.paymentStatus !== nextState.paymentStatus) return true;

    if (this.state.showPaymentIFrame && currentPaymentURL === nextPaymentURL) {
      return false;
    } else {
      return true;
    }
  }

  tooglePaymentIFrame() {
    this.setState(prevState => ({ showPaymentIFrame: !prevState.showPaymentIFrame }));
  }

  toggleEnablePayment = status => {
    this.setState({
      enablePayment: status,
    });
  };

  iFrameMessage = e => {
    if (e.origin === 'https://secure.safecharge.com') {
      const data = JSON.parse(e.data);

      if (['success', 'error', 'canceledByUser'].includes(data)) {
        this.setState({ paymentStatus: data });

        if (data === 'error') {
          document.querySelector('#safecharge_payment_iframe').src = this.props.order.payment_url;
        }

        if (data === 'canceledByUser') window.location.reload();
      }
    }
  };

  handleEmailChange(e) {
    this.setState({ userEmail: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.put(`${config.API_BASE_URL}/users/me/`, { email: this.state.userEmail }).then(() => {
      localStorage.setItem(
        'termsAgreed',
        JSON.stringify({ on: Date.now(), order: this.props.order.unique_reference, email: this.state.userEmail })
      );
    });

    this.props.order.payment_url && this.state.enablePayment && this.tooglePaymentIFrame();
  }

  componentDidMount() {
    const { email } = JSON.parse(localStorage.termsAgreed || '{}');
    const safechargeStatus = getUrlPram('ppp_status');
    if (!_.isEmpty(safechargeStatus)) {
      $('body').hide();
    }

    if (email) this.setState({ showPaymentIFrame: true });

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

  render() {
    const props = this.props;

    if (this.state.paymentStatus === 'success') return <OrderPreReleased />;

    return (
      <>
        {/* if payment_url is null, show error. payment_url can be null because of token mismatch */}
        {props.order.payment_url ? (
          <div>
            <Helmet>
              <link rel="preload" href={props.order.payment_url} as="document" />
            </Helmet>
            {this.state.showPaymentIFrame ? (
              <div>
                <PaymentNewTabText>
                  <a href={props.order.payment_url} target="_blank" rel="noopener noreferrer">
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
                    src={props.order.payment_url}
                    height={620}
                    width={'100%'}
                    scrolling="no"
                    style={{ border: 'none' }}
                  />
                </PaymentIframeContainer>
              </div>
            ) : (
              <I18n ns="translations">
                {t => (
                  <div id="order-payment" className={`row ${styles.container}`}>
                    <form id="order-payment-details" className="col-xs-12 col-ms-6 col-sm-6 col-md-6" onSubmit={this.handleSubmit}>
                      {props.time !== '00:00' && (
                        <h3>
                          {t('order.initial1')}:{' '}
                          <span className={styles.time}>
                            <b>{props.time}</b>
                          </span>
                        </h3>
                      )}
                      <h4>
                        {t('order.pay')}{' '}
                        <b>
                          {parseFloat(props.order.amount_quote)} {props.order.pair.quote.code}
                        </b>
                      </h4>

                      <UserEmail>
                        <label htmlFor="userEmail" className="sr-only">
                          Your email
                        </label>
                        <input
													type="email"
													pattern="^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                          id="userEmail"
                          name="userEmail"
                          placeholder="Enter your email"
                          value={this.state.userEmail}
                          onChange={this.handleEmailChange}
                          required
                        />
                      </UserEmail>

                      <Checkbox onTogglePayment={this.toggleEnablePayment} name="checkboxTC" order="order.iAgreedTC" />
                      <Checkbox onTogglePayment={this.toggleEnablePayment} name="checkboxKYC" order="order.iAcknowledgeKYC" />

                      <button
                        type="submit"
                        className="btn btn-default btn-lg"
                        name="checkoutButton"
                        data-toggle="tooltip"
                        title={this.state.enablePayment ? '' : t('order.tooltipTC')}
                        style={{ pointerEvents: 'auto' }}
                      >
                        <i className="fas fa-credit-card" aria-hidden="true" style={{ position: 'relative', left: -13 }} />
                        {t('order.fiat.status.pay')}
                      </button>
                    </form>

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
      </>
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
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {
      var prefix = encodeURIComponent(parameter) + '=';
      var pars = urlparts[1].split(/[&;]/g);

      //reverse iteration as may be destructive
      for (var i = pars.length; i-- > 0; ) {
        //idiom for string.startsWith
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1);
        }
      }

      return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
  }
  return url;
};

const getUrlPram = parameter => {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const value = url.searchParams.get(parameter);
  return value;
};

export default OrderInitial;
