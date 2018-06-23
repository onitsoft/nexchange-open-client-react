import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FAQ from './FAQ/FAQ';
import Support from './Support/Support';

import styles from './Header.scss';

let scrollToElement;

class Header extends Component {
  state = {
    showFaqModal: false,
    showSupportModal: false,
  };

  componentDidMount() {
    scrollToElement = require('scroll-to-element');

    let hash = window.location.hash;
    if (hash && hash !== '') {
      hash = hash.replace('#', '');

      let el = document.getElementById(hash);
      if (el) el.scrollIntoView();
    }
  }

  render() {
    return (
      <div className={`${styles.header} ${window.location.pathname === '/' ? styles.home : ''}`}>
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
                {window.location.pathname === '/' ? <img src="/img/logo-white.svg" alt="Logo" /> : <img src="/img/logo.svg" alt="Logo" />}
              </div>
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navigation-index">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className={styles.link} href="/#about" onClick={() => scrollToElement('#about')}>
                  About
                </a>
              </li>

              <li>
                <a className={styles.link} href="javascript:void(0)" onClick={() => this.setState({ showFaqModal: true })}>
                  FAQ
                </a>
              </li>

              <li>
                <a
                  className={`${styles.link} hidden-sm`}
                  href="http://docs.nexchange2.apiary.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => ga('send', 'event', 'General', 'api docs click')}
                >
                  API Docs
                </a>
              </li>

              <li>
                <a className={styles.link} href="/#compare" onClick={() => scrollToElement('#compare')}>
                  Rates
                </a>
              </li>

              <li>
                <a className={styles.link} href="javascript:void(0)" onClick={() => this.setState({ showSupportModal: true })}>
                  Support
                </a>
              </li>

              <li className={styles['ico-link']}>
                <a href="https://n.exchange/ico" className={`${styles.btn} btn btn-block btn-primary`}>
                  ICO PAGE
                </a>
              </li>

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

              <li className="visible-sm visible-md visible-lg social-desktop">
                <a
                  href="/twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.social} btn btn-simple btn-just-icon`}
                  rel="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title="Follow us on Twitter"
                >
                  <i className="fab fa-twitter" aria-hidden="true" />
                </a>
              </li>

              <li className="visible-sm visible-md visible-lg social-desktop">
                <a
                  href="/fb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.social} btn btn-simple btn-just-icon`}
                  rel="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title="Like us on Facebook"
                >
                  <i className="fab fa-facebook-f" aria-hidden="true" />
                </a>
              </li>

              <li className="visible-sm visible-md visible-lg social-desktop">
                <a
                  href="/slack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.social} btn btn-simple btn-just-icon`}
                  rel="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title="Join us on Slack"
                >
                  <i className="fab fa-slack-hash" aria-hidden="true" />
                </a>
              </li>

              <li className="visible-sm visible-md visible-lg social-desktop">
                <a
                  href="/telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.social} btn btn-simple btn-just-icon`}
                  rel="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title="Join us on Telegram"
                >
                  <i className="fab fa-telegram" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <FAQ show={this.state.showFaqModal} onClose={() => this.setState({ showFaqModal: false })} />
          <Support show={this.state.showSupportModal} onClose={() => this.setState({ showSupportModal: false })} />
        </div>
      </div>
    );
  }
}

export default Header;
