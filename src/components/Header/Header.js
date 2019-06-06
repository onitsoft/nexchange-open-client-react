import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import ScrollToElement from 'scroll-to-element';

import Support from './Support/Support';
// import LanguagePicker from './LanguagePicker/LanguagePicker';


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
    if (window.location.pathname === '/' 
      || window.location.pathname.indexOf('/faqs') !== -1 
      || window.location.pathname.indexOf('/transitioning') !== -1) {
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
                      <img src="/img/logo.svg" alt="Logo" data-test="logo" />
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
                    <Link 
                      onClick={() => { this.closeNavbar();this.setState({ showSupportModal: true });}} 
                      className={styles.link}
                      to='#'
                      data-test="support-btn">
                        {t('header.support')}
                    </Link>
                  </li>

                  {/* <LanguagePicker /> */}
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
