import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router'
import { I18n } from 'react-i18next';
import i18n from 'i18next';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserIcon from './user.svg'

import Support from './Support/Support';
import LanguagePicker from './LanguagePicker/LanguagePicker';
import { loadAuth, loadUserDetails } from 'Actions'

import styles from './Header.scss';

const Header = props => {
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [, setShowNavbar] = useState(false)
  const location = useLocation()

  const isHomeHeader = useMemo(() => {
  const { pathname } = location

  if (pathname === '/en' || pathname === '/de' || pathname === '/ru'
        || pathname.indexOf('/instant-white-label') !== -1
        || pathname.indexOf('/faqs') !== -1
        || pathname === '/not-found') {
      return true;
    }
    return false;
  }, [location])

  const isHideHeader = useMemo(() => {
    const { pathname } = location
    if (pathname === '/signin' 
        || pathname === '/signup'
        || pathname === '/forgot-password') {
      return true;
    }
    return false
  }, [location]);

  useEffect(() => {
    props.loadAuth()
  }, [])

  useEffect(() => {
    if (props.auth && props.auth.token && props.auth.token.access_token) {
      if (!props.auth.profile) {
        props.loadUserDetails()
      }
    }
  }, [props.auth])


  const closeNavbar = useCallback(() => { setShowNavbar(false) }, [setShowNavbar])
  const hideSupport = useCallback(() => { setShowSupportModal(false) }, [setShowSupportModal])
  
  if (isHideHeader) return null
  
  return (
    <HeaderStuff {...{ auth: props.auth, closeNavbar, isHomeHeader, setShowSupportModal, showSupportModal, hideSupport }} />
  );
}

export const HeaderStuff = (props) => {
  const { isHomeHeader, closeNavbar, setShowSupportModal, showSupportModal, hideSupport } = props
  const lang = i18n.language ? i18n.language : 'en'

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

              <Link to={`/${lang}`}>
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
                  <Link onClick={() => closeNavbar()} to={`/${lang}/about`} className={styles.link}>
                      {t('header.about')}
                  </Link>
                </li>

                <li>
                <Link onClick={() => closeNavbar()} to={`/${lang}/faqs`} className={styles.link} data-test="faq-btn">
                      {t('header.faq')}
                  </Link>
                </li>

                <li>
                <Link onClick={() => closeNavbar()} to="/pricecomparsion" className={styles.link} data-test="pricecomparsion-btn">
                      {t('header.pricecomparsion')}
                  </Link>
                </li>

                <li>
                <Link onClick={() => closeNavbar()} to="/team" className={styles.link} data-test="pricecomparsion-btn">
                      {t('header.team')}
                  </Link>
                </li>

                <li>
                  <a
                    className={`${styles.link} hidden-sm hidden-md`}
                    href="http://docs.nexchange2.apiary.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.gtag('event', 'API open', {event_category: 'API', event_label: ``})}
                    data-test="api-link"
                  >
                    {t('header.apidocs')}
                  </a>
                </li>

                {/* <li>
                  <Link onClick={() => this.closeNavbar()} to="/#compare" className={`${styles.link} hidden-sm`} data-test="compare-link">
                      {t('header.compare')}
                  </Link>
                </li> */}

                <li>
                  <Link 
                    onClick={() => { closeNavbar(); setShowSupportModal(true) }} 
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
                
                {(props.auth && props.auth.profile && props.auth.profile.username && (
                  <li>
                    <Link className={styles.link} to='/profile/me'>
                      <UserIcon style={{width: 18, height: 18}} title={props.auth.profile.username} />
                    </Link>
                  </li>
                )) || (
                  <>
                    <li>
                      <Link className={styles.link} to={`/${lang}/signup`} >
                        {t('accounts.signup')}
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.link} to={`/${lang}/signin`} >
                        {t('accounts.signin')}
                      </Link>
                    </li>
                  </>
                )}

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

            <Support show={showSupportModal} onClose={() => hideSupport()} />
          </div>
        </div>
      )} 
    </I18n>
  )
}


const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ loadAuth, loadUserDetails }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
