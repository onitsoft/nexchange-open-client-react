import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router';
import { I18n } from 'react-i18next';
import i18n from 'i18next';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserIcon from './user.svg';

import Support from './Support/Support';
import LanguagePicker from './LanguagePicker/LanguagePicker';
import { loadAuth, loadUserDetails, showSupportModal } from 'Actions';

import styles from './Header.scss';

const Header = props => {
  const [, setShowNavbar] = useState(false);
  const location = useLocation();
  const lang = i18n.language || window.localStorage.i18nextLng || 'en';

  const isHomeHeader = useMemo(() => {
    const { pathname } = location;
    const routes = ['instant-white-label', 'faqs'];

    // Comment: Matches - /lang, /lang/, /lang/route, /lang/route/, etc
    const showHomeHeader = routes.map(route => new RegExp(`^/${lang}(/${route})?(/)?$`).test(pathname));

    if (showHomeHeader.includes(true)) {
      return true;
    }
    return false;
  }, [location]);

  const isHideHeader = useMemo(() => {
    const { pathname } = location;
    const routes = ['signin', 'signup', 'forgot-password'];

    // Comment: Matches - /lang/route, /lang/route/
    const shouldHide = routes.map(route => new RegExp(`^/${lang}/${route}(/?)$`).test(pathname));

    if (shouldHide.includes(true)) {
      return true;
    }
    return false;
  }, [location]);

  useEffect(() => {
    props.loadAuth();
  }, []);

  useEffect(() => {
    if (props.auth && props.auth.token && props.auth.token.access_token) {
      if (!props.auth.profile) {
        props.loadUserDetails();
      }
    }
  }, [props.auth]);

  const closeNavbar = useCallback(() => {
    setShowNavbar(false);
  }, [setShowNavbar]);

  const hideSupport = useCallback(() => {
    props.showSupportModal(false);
  }, [props.supportModal]);

  if (isHideHeader) return null;

  return (
    <HeaderStuff
      {...{
        auth: props.auth,
        supportModal: props.supportModal,
        showSupportModal: props.showSupportModal,
        lang,
        closeNavbar,
        isHomeHeader,
        hideSupport,
      }}
    />
  );
};

export const HeaderStuff = props => {
  const { isHomeHeader, lang, closeNavbar, hideSupport, supportModal } = props;

  return (
    <I18n ns="translations">
      {(t, { i18n }) => (
        <div className={`${styles.header} ${isHomeHeader ? styles.home : ''}`} data-test="header">
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
                  <HashLink smooth onClick={() => closeNavbar()} to={`/${lang}#about`} className={styles.link}>
                    {t('header.about')}
                  </HashLink>
                </li>

                <li>
                  <Link onClick={() => closeNavbar()} to={`/${lang}/faqs`} className={styles.link} data-test="faq-btn">
                    {t('header.faq')}
                  </Link>
                </li>

                {/* <li>
                  <Link onClick={() => closeNavbar()} to="/pricecomparsion" className={styles.link} data-test="pricecomparsion-btn">
                    {t('header.pricecomparsion')}
                  </Link>
                </li>

                <li>
                  <Link onClick={() => closeNavbar()} to="/team" className={styles.link} data-test="pricecomparsion-btn">
                    {t('header.team')}
                  </Link>
                </li> */}

                {/* <li>
                  <a
                    className={`${styles.link} hidden-sm hidden-md`}
                    href="http://docs.nexchange2.apiary.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.gtag('event', 'API open', { event_category: 'API', event_label: `` })}
                    data-test="api-link"
                  >
                    {t('header.apidocs')}
                  </a>
                </li> */}

                {/* <li>
                  <Link onClick={() => this.closeNavbar()} to="/#compare" className={`${styles.link} hidden-sm`} data-test="compare-link">
                      {t('header.compare')}
                  </Link>
                </li> */}

                <li>
                  <Link
                    onClick={() => {
                      closeNavbar();
                      props.showSupportModal(true);
                    }}
                    className={styles.link}
                    to="#"
                    data-test="support-btn"
                  >
                    {t('header.support')}
                  </Link>
                </li>

                <li className={styles['ico-link']}>
                  <a
                    href="https://n.exchange/ico"
                    className={`${styles.btn} btn btn-block btn-primary`}
                    onClick={() => {
                      window.gtag('event', 'ICO open', { event_category: 'ICO', event_label: `` });
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
                    <Link className={styles.link} to={`/${lang}/profile/me`}>
                      <UserIcon style={{ width: 18, height: 18 }} title={props.auth.profile.username} />
                    </Link>
                  </li>
                )) || (
                  <>
                    <li>
                      <Link className={styles.link} to={`/${lang}/signup`}>
                        {t('accounts.signup')}
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.link} to={`/${lang}/signin`}>
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
                    href="/youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                  >
                    <i className="fab fa-youtube" aria-hidden="true" />
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
                    href="/youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon`}
                    title={t('header.youtube')}
                    data-toggle="tooltip"
                    data-placement="bottom"
                  >
                    <i className="fab fa-youtube" aria-hidden="true" />
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

            <Support show={supportModal} onClose={() => hideSupport()} />
          </div>
        </div>
      )}
    </I18n>
  );
};

const mapStateToProps = ({ auth, supportModal }) => ({ auth, supportModal });
const mapDispatchToProps = dispatch => bindActionCreators({ loadAuth, loadUserDetails, showSupportModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
