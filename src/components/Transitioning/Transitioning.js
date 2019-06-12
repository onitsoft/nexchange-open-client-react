import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import urlParams from 'Utils/urlParams';

import styles from './Transitioning.scss';



class Transitioning extends Component {
  constructor(props) {
    super(props)

    this.redirect = this.redirect.bind(this);
  };

  redirect() {
    console.log(this.props);
    const orderRef = this.props.match.params.orderRef;
    if (orderRef) {
        document.location.href = `https://n.exchange/order/${orderRef}`;
    }
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <div className="container">  
              <div className={`col-xs-12 ${styles.transitioning}`}>
                  <div className={`col-xs-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 ${styles.content}`}>
                    <div class={styles.heading}>
                        <div class={styles['heading-section']}>
                            <img src='/img/dragon2.svg' alt='Dragondex'></img>
                            <span>DRAGONDEX</span>
                        </div>
                        <div className={styles.arrow}></div>
                        <div className={styles.arrow}></div>
                        <div className={styles.arrow}></div>
                        <div className={styles.arrow}></div>
                        <div className={styles.arrow}></div>
                        <div className={styles.arrow}></div>
                        <div className={styles.arrow}></div>
                        <div className={styles.arrow}></div>
                        <div className={styles.arrow}></div>
                        <div class={styles['heading-section']}>
                            <img src='/img/nexchange.svg' alt='N.Exchange'></img>
                            <span>N.EXCHANGE</span>
                        </div>
                    </div>
                    <p>You are now transitioning from <strong>DRAGONDEX</strong> to <strong>N.EXCHANGE</strong>&nbsp;
                    to make a FIAT to Cryptocurrency transaction</p>
                    <p className={styles.nomargin}>Fiat to Cryptocurrency functionality provided by N.EXCHANGE.</p>
                    <p>DRAGONDEX is an affiliate of n.exchange.</p>
                    <p class={styles.small}>Australian Dollars, US Dollars, Euro - <strong>Accepted</strong></p>
                    <p class={styles.smaller}>Please read n.exchange&nbsp;	
                        <a href='https://n.exchange/terms-and-conditions/' target="_blank">Privacy Policy</a> 
                        &nbsp;and&nbsp;
                        <a href='https://n.exchange/privacy' target="_blank">Terms and Conditions</a></p>
                    <div onClick={() => this.redirect()} class={styles.button}>CLICK TO PROCEED</div>
                  </div>
               </div>
              </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default Transitioning;
