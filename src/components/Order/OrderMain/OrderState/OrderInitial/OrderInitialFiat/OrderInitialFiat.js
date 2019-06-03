import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import styles from '../OrderInitial.scss';

class OrderInitial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enablePayment: false,
      showPaymentIFrame: false
    }
    
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentPaymentURL = removeUnnecessaryURLParams(this.props.order.payment_url);
    const nextPaymentURL = removeUnnecessaryURLParams(nextProps.order.payment_url);
    if(this.state.showPaymentIFrame && currentPaymentURL === nextPaymentURL) {
      return false;
    } else {
      return true;
    }
  }

  tooglePaymentIFrame(){
    this.setState({
      showPaymentIFrame: !this.state.showPaymentIFrame
    });
  }

  componentDidMount(){
    const safechargeStatus = getUrlPram('ppp_status');
    if(!_.isEmpty(safechargeStatus)) {
      $('body').hide();
    }
  }

  UNSAFE_componentWillUpdate() {
    const safechargeStatus = getUrlPram('ppp_status');
    if(!_.isEmpty(safechargeStatus)){
      if(this.props.order && this.props.order.payment_url) {
        if(safechargeStatus === 'OK'){
          $('body').replaceWith(`<div class="loader-container"><div class="loader"></div></div>`);
        } else {
          $('html').replaceWith(`<iframe title='SafeCharge Payment' src=${this.props.order.payment_url} height=500 width='100%' />`);
        } 
      }
    }
  }

  render(){
    const props = this.props;

    return (
      <div>
      {this.state.showPaymentIFrame ? 
      <iframe title="SafeCharge" src={props.order.payment_url} height={500} width={"100%"} scrolling="no"/> :
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
              {/* eslint max-len: ["error", { "code": 200 }] */}
              <input type="checkbox" name="checkboxTC" id="checkboxTC" value="check" style={{ width: '20px', height: '20px', cursor: 'pointer'}}
              onClick={function togglePayNowButton() {
                  let _checkoutButton = document.getElementsByName("checkoutButton")[0];
                  let _box = document.getElementsByName("checkboxTC")[0];
                  let _box_kyc = document.getElementsByName("checkboxKYC")[0];
                  if (_box.checked && _box_kyc.checked) {
                      this.setState({enablePayment: true});
                      _checkoutButton.classList.remove("disabled");
                  } else {
                      this.setState({enablePayment: false});
                      _checkoutButton.classList.add("disabled");
                  }
              }.bind(this)}/>
              <strong style={{paddingLeft: "7px", cursor: 'pointer'}} dangerouslySetInnerHTML={{__html: t('order.iAgreedTC')}}/>
            </label>

            <label>
            {/* eslint max-len: ["error", { "code": 200 }] */}
            <input type="checkbox" name="checkboxKYC" id="checkboxKYC" value="check" style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            onClick={function togglePayNowButton() {
                let _checkoutButton = document.getElementsByName("checkoutButton")[0];
                let _box = document.getElementsByName("checkboxTC")[0];
                let _box_kyc = document.getElementsByName("checkboxKYC")[0];
                if (_box.checked && _box_kyc.checked) {
                    this.setState({enablePayment: true});
                    _checkoutButton.classList.remove("disabled");
                } else {
                    this.setState({enablePayment: false});
                    _checkoutButton.classList.add("disabled");
                }
            }.bind(this)}/>
                <strong style={{paddingLeft: "7px", cursor: 'pointer'}}>{t('order.iAcknowledgeKYC')}</strong>
            </label>


            <a className="btn btn-default btn-lg disabled" name="checkoutButton" data-toggle="tooltip"
              title={t('order.tooltipTC')} style={{ pointerEvents: 'auto'}} 
              onClick={() => {props.order.payment_url && this.state.enablePayment && this.tooglePaymentIFrame()}}>
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
      </I18n>}
    </div>);
    }
};

const removeUnnecessaryURLParams = (url) => {
  url = removeURLParam(url, 'notify_url')
  url = removeURLParam(url,'checksum');
  url = removeURLParam(url,'time_stamp');
  return url;
} 

const removeURLParam = (url, parameter) => {
  if(!_.isEmpty(url) && !_.isEmpty(parameter)) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');   
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
  }
  return url;
}

const getUrlPram = (parameter) => {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const value = url.searchParams.get(parameter);
  return value;
}


export default OrderInitial;
