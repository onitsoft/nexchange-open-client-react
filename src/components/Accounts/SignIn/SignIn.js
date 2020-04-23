import React, { useState, useEffect, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn } from 'Actions'

import styles from '../Accounts.scss';

const SignIn = (props) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [state, setState] = useState({
    username: '',
    password: '',
  })

  const { loading } = props.auth

  useEffect(() => {
    $("#root").css({'padding-bottom': "0px"});

    return () => {
      $("#root").css({'padding-bottom': "114px"});
    }
  }, [])


  const onSubmit = useCallback((e) => {
    e.preventDefault()
    props.signIn(state.username, state.password)
  }, [state, props.signIn])

  useEffect(() => {
    if (props.auth && props.auth.token) {
      const { token } = props.auth
      if (token.issued_at + (token.expires_in * 1000) > Date.now()) {
        if (!loggedIn) { setLoggedIn(true) }
      }
    }
  }, [props.auth])

  if (loggedIn) {
    return <Redirect to='/' />
  }

  return (
    <I18n ns="translations">
      {(t, {lng}) => (
        <div className='row'>
          <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-7 ${styles.left}`}>
            <Link to="/">
              <div className={styles['logo-container']}>
                <img className={styles.logo} src="/img/logo-white.svg" alt="Logo" data-test="logo" />
              </div>
            </Link>
            <h1 className={styles.heading}>{t('accounts.signinheader')}</h1>
          </div>
          <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-5 ${styles.right}`}>
          <Link to="/">
              <div className={`${styles['logo-container']} hidden-md hidden-lg hidden-xl`}>
                <img className={styles.logo} src="/img/logo.svg" alt="Logo" data-test="logo" />
              </div>
            </Link>
            <div className={`col-xs-8 col-offset-xs-2`}>
              {props.auth.error && (
                <div class="alert alert-danger" role="alert">{props.auth.error.toString()}</div>
              )}
              <form className="form-group" onSubmit={onSubmit}>
                <div className={styles['input-container']}>
                  <input
                    type="text"
                    className={`form-control`}
                    id="username"
                    value={state.username}
                    onChange={({ target: { value } }) => setState(st => ({...st, username: value}))}
                    placeholder={t('accounts.username')}
                    disabled={loading}
                  />
                </div>
                <div className={styles['input-container']}>
                  <input
                    type="password"
                    className={`form-control`}
                    id="password"
                    value={state.password}
                    onChange={({ target: { value } }) => setState(st => ({...st, password: value}))}
                    placeholder={t('accounts.password')}
                    disabled={loading}
                  />
                </div>
                <button
                  disabled={loading}
                  type='submit'
                  className={`${styles.button} ${styles.main}`}
                >{!loading ? t('accounts.signin') : 'Loading...' }</button>
              </form>
              <Link to={`/${lng}/forgot-password`} className={styles['not-registered']}>
                <div>{t('accounts.forgotpassword1')}</div>
              </Link>
              <div className={styles.separator}></div>
              <Link to={`/${lng}/signup`} className={styles['not-registered']}>
                <button className={`${styles.button} ${styles.secondary}`}>{t('accounts.signup')}</button>
              </Link>
              {/* <button className={`${styles.button} ${styles.facebook}`}>{t('accounts.signinwithfacebook')}</button> */}
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
