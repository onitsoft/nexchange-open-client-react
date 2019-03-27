import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import ScrollToElement from 'scroll-to-element';


import FAQ from './FAQ/FAQ';
import Support from './Support/Support';
import LanguagePicker from './LanguagePicker/LanguagePicker';


import styles from './Header.scss';

class Header extends Component {
  state = {
    showFaqModal: false,
    showSupportModal: false,
  };

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

  closeFaqModal = () => this.setState({ showFaqModal: false });
  closeSupportModal = () => this.setState({ showSupportModal: false });

  scrollTo = (element) => {
    ScrollToElement(element,{
      offset: 0,
      ease: 'linear',
      duration: 1000
    });
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className={`${styles.header} ${window.location.pathname === '/' ? styles.home : ''}`} data-test="header">
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
                    {window.location.pathname === '/' ? (
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
                    <a className={styles.link} href="#" onClick={() => { this.scrollTo("#about"); }} >
                      {t('header.about')}
                    </a>
                  </li>

                  <li>
                    <a
                      className={styles.link}
                      href="javascript:void(0)"
                      onClick={() => {
                        window.gtag('event', 'FAQs open', {event_category: 'FAQ', event_label: ``});
                        this.setState({ showFaqModal: true });
                      }}
                      data-test="faq-btn"
                    >
                      {t('header.faq')}
                    </a>
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
                    <a className={styles.link} href="/#compare" data-test="compare-link">
                      {t('header.compare')}
                    </a>
                  </li>

                  <li>
                    <a
                      className={styles.link}
                      href="javascript:void(0)"
                      onClick={() => this.setState({ showSupportModal: true })}
                      data-test="support-btn"
                    >
                      {t('header.support')}
                    </a>
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
                      rel="tooltip"
                      title=""
                      data-placement="bottom"
                      data-original-title={t('header.twitter')}
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
                      rel="tooltip"
                      title=""
                      data-placement="bottom"
                      data-original-title={t('header.facebook')}
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
                      rel="tooltip"
                      title=""
                      data-placement="bottom"
                      data-original-title={t('header.slack')}
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
                      rel="tooltip"
                      title=""
                      data-placement="bottom"
                      data-original-title={t('header.telegram')}
                    >
                      <i className="fab fa-telegram" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>

              <FAQ show={this.state.showFaqModal} onClose={this.closeFaqModal} />
              <Support show={this.state.showSupportModal} onClose={this.closeSupportModal} />
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default Header;
