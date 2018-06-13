import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

import FAQ from './FAQ/FAQ';
import Support from './Support/Support';

let scrollToElement;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFaqModal: false,
      showSupportModal: false,
    };
  }

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
		<I18n ns="translations">
		{(t, { i18n }) => (
	    	<div id="header">
				<div className="container">
				    <div className="navbar-header">
				    	<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
						  <span className="sr-only">Toggle navigation</span>
						  <span className="icon-bar" />
						  <span className="icon-bar" />
						  <span className="icon-bar" />
				    	</button>

            <Link to="/">
              <div className="logo-container">
                <img src="/img/logo.svg" alt="Logo" />
              </div>
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navigation-index">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="link" href="/#about" onClick={() => scrollToElement('#about')}>
                  {t('header.about')}
                </a>
              </li>

              <li>
                <a className="link" href="javascript:void(0)" onClick={() => this.setState({ showFaqModal: true })}>
                  {t('header.faq')}
                </a>
              </li>

              <li>
                <a
                  className="link hidden-sm"
                  href="http://docs.nexchange2.apiary.io/"
                  target="_blank"
                  onClick={() => ga('send', 'event', 'General', 'api docs click')}
                >
                  {t('header.apidocs')}
                </a>
              </li>

              <li>
                <a className="link" href="/#compare" onClick={() => scrollToElement('#compare')}>
                  {t('header.compare')}
                </a>
              </li>

              <li>
                <a className="link" href="javascript:void(0)" onClick={() => this.setState({ showSupportModal: true })}>
                  {t('header.support')}
                </a>
              </li>

              <li id="ico-link">
                <a href="https://n.exchange/ico" className="btn btn-block btn-primary">
                  ICO
                </a>
              </li>

              <li id="social-mobile">
                <a className="link" href="/twitter" target="_blank" className="btn btn-simple btn-just-icon visible-xs">
                  <i className="fab fa-twitter" aria-hidden="true" />
                </a>

                <a className="link" href="/fb" target="_blank" className="btn btn-simple btn-just-icon visible-xs">
                  <i className="fab fa-facebook-f" aria-hidden="true" />
                </a>

                <a className="link" href="/slack" target="_blank" className="btn btn-simple btn-just-icon visible-xs">
                  <i className="fab fa-slack-hash" aria-hidden="true" />
                </a>

                <a className="link" href="/telegram" target="_blank" className="btn btn-simple btn-just-icon visible-xs">
                  <i className="fab fa-telegram" aria-hidden="true" />
                </a>
              </li>

              <li className="visible-sm visible-md visible-lg social-desktop">
                <a
                  href="/twitter"
                  target="_blank"
                  className="btn btn-simple btn-just-icon"
                  rel="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title={t('header.twitter')}
                >
                  <i className="fab fa-twitter" aria-hidden="true" />
                </a>
              </li>

              <li className="visible-sm visible-md visible-lg social-desktop">
                <a
                  href="/fb"
                  target="_blank"
                  className="btn btn-simple btn-just-icon"
                  rel="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title={t('header.facebook')}
                >
                  <i className="fab fa-facebook-f" aria-hidden="true" />
                </a>
              </li>

              <li className="visible-sm visible-md visible-lg social-desktop">
                <a
                  href="/slack"
                  target="_blank"
                  className="btn btn-simple btn-just-icon"
                  rel="tooltip"
                  title=""
                  data-placement="bottom"
                  data-original-title={t('header.slack')}
                >
                  <i className="fab fa-slack-hash" aria-hidden="true" />
                </a>
              </li>

              <li className="visible-sm visible-md visible-lg social-desktop">
                <a
                  href="/telegram"
                  target="_blank"
                  className="btn btn-simple btn-just-icon"
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

          <FAQ show={this.state.showFaqModal} onClose={() => this.setState({ showFaqModal: false })} />
          <Support show={this.state.showSupportModal} onClose={() => this.setState({ showSupportModal: false })} />
        </div>
      </div>
	)}
	</I18n>
    );
  }
}

export default Header;
