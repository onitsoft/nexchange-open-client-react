import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import ScrollToElement from 'scroll-to-element';

import Support from './Support/Support';
import LanguagePicker from './LanguagePicker/LanguagePicker';


import styles from './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSupportModal: false,
    };
  
    this.closeNavbar = this.closeNavbar.bind(this);
  }

  componentDidMount() {
    /* istanbul ignore next */
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    /* istanbul ignore next */
    if (window.location.hash && isChrome) {
      /* istanbul ignore next */
      setTimeout(function() {
        const hash = window.location.hash;
        window.location.hash = '';
        window.location.hash = hash;
      }, 2000);
    }
  }

  closeSupportModal = () => this.setState({ showSupportModal: false });

  closeNavbar = () => {
      $('.navbar-collapse').collapse('hide');
  }

  componentDidUpdate(){
    if(window.location.hash) {
      ScrollToElement(`${window.location.hash}`,{
        offset: 0,
        ease: 'linear',
        duration: 1000
      });
   }
  }

  isHomeHeader = () => {
    if (window.location.pathname === '/' || window.location.pathname.indexOf('/faqs') !== -1) {
      return true;
    }
    return false;
  }

  render() {
    const isHomeHeader = this.isHomeHeader();
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className={`${styles.header} ${ isHomeHeader ? styles.home : ''}`} data-test="header">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>

                <Link to="/">
                  <div className={styles['logo-container']}>
                    {isHomeHeader ? (
                      <img src="/img/logo-white.svg" alt="Logo" data-test="logo" />
                    ) : (
                      <img src="/img/logo.svg" alt="Logo" data-test="logo" />
                    )}
                  </div>
                </Link>
              </div>

              <div className="collapse navbar-collapse" id="navigation-index">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link onClick={() => this.closeNavbar()} to="/#about" className={styles.link}>
                        {t('header.about')}
                    </Link>
                  </li>

                  <li>
                   <Link onClick={() => this.closeNavbar()} to="/faqs" className={styles.link} data-test="faq-btn">
                        {t('header.faq')}
                    </Link>
                  </li>

                  <li>
                    <a
                      className={`${styles.link} hidden-sm`}
                      href="http://docs.nexchange2.apiary.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => window.gtag('event', 'API open', {event_category: 'API', event_label: ``})}
                      data-test="api-link"
                    >
                      {t('header.apidocs')}
                    </a>
                  </li>

                  <li>
                    <Link onClick={() => this.closeNavbar()} to="/#compare" className={styles.link} data-test="compare-link">
                        {t('header.compare')}
                    </Link>
                  </li>

                  <li>
                    <Link 
                      onClick={() => { this.closeNavbar();this.setState({ showSupportModal: true });}} 
                      className={styles.link}
                      to='#'
                      data-test="support-btn">
                        {t('header.support')}
                    </Link>
                  </li>

                  <li className={styles['ico-link']}>
                    <a
                      href="https://n.exchange/ico"
                      className={`${styles.btn} btn btn-block btn-primary`}
                      onClick={() => {
                        window.gtag('event', 'ICO open', {event_category: 'ICO', event_label: ``});

                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-test="ico-link"
                    >
                      {t('header.ico')}
                    </a>
                  </li>

                  <LanguagePicker />

                  <li id="social-mobile">
                    <a
                      href="/twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                    >
                      <i className="fab fa-twitter" aria-hidden="true" />
                    </a>

                    <a
                      href="/fb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                    >
                      <i className="fab fa-facebook-f" aria-hidden="true" />
                    </a>

                    <a
                      href="/slack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                    >
                      <i className="fab fa-slack-hash" aria-hidden="true" />
                    </a>

                    <a
                      href="/telegram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                    >
                      <i className="fab fa-telegram" aria-hidden="true" />
                    </a>
                  </li>

                  <li className="visible-md visible-lg social-desktop">
                    <a
                      href="/twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.social} btn btn-simple btn-just-icon`}
                      title={t('header.twitter')}
                      data-toggle="tooltip" 
                      data-placement="bottom"
                    >
                      <i className="fab fa-twitter" aria-hidden="true" />
                    </a>
                  </li>

                  <li className="visible-md visible-lg social-desktop">
                    <a
                      href="/fb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.social} btn btn-simple btn-just-icon`}
                      title={t('header.facebook')}
                      data-toggle="tooltip" 
                      data-placement="bottom"
                    >
                      <i className="fab fa-facebook-f" aria-hidden="true" />
                    </a>
                  </li>

                  <li className="visible-md visible-lg social-desktop">
                    <a
                      href="/slack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.social} btn btn-simple btn-just-icon`}
                      title={t('header.slack')}
                      data-toggle="tooltip" 
                      data-placement="bottom"
                    >
                      <i className="fab fa-slack-hash" aria-hidden="true" />
                    </a>
                  </li>

                  <li className="visible-md visible-lg social-desktop">
                    <a
                      href="/telegram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.social} btn btn-simple btn-just-icon`}
                      title={t('header.telegram')}
                      data-toggle="tooltip" 
                      data-placement="bottom"
                    >
                      <i className="fab fa-telegram" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>

              <Support show={this.state.showSupportModal} onClose={this.closeSupportModal} />
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default Header;
