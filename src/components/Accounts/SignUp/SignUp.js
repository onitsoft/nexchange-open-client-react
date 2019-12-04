import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUp } from 'Actions'

import { Checkbox } from 'react-bootstrap'

import styles from '../Accounts.scss';

export const SignUp = (props) => {
  const { auth } = props
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreedTC: false
  })

  useEffect(() => {
    $("#root").css({'padding-bottom': "0px"});

    return () => {
      $("#root").css({'padding-bottom': "114px"});
    }
  }, [])

  const onSubmit = useCallback(e => {
    const passCheck = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/
    const usernameCheck = /^(?=.*[a-zA-Z0-9])(?=.{4,})/
    const emailCheck = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
    e.preventDefault()
    if (!state.username || !usernameCheck.test(state.username)) {
      setState(st => ({...st, error: 'username'}))
    } else if (!state.email || !emailCheck.test(state.email)) {
      setState(st => ({...st, error: 'email'}))
    } else if (!state.password || !passCheck.test(state.password)) {
      setState(st => ({...st, error: 'password'}))
    } else if (state.password && state.password !== state.repeatPassword) {
      setState(st => ({...st, error: 'repeatPassword'}))
    } else if (!state.agreedTC) {
      setState(st => ({...st, error: 'agreedTC'}))
    } else {
      props.signUp({
        username: state.username,
        email: state.email,
        password: state.password,
        phone: 'notset'
      })
    }
  }, [state])

  const setValue = useCallback(name => ({target: { value }}) => {
    setState(st => ({ 
      ...st, 
      [name]: value,
      error: (!st.error || name === st.error) ? null : st.error
    }))
  }, [setState])

  return (
    <I18n ns="translations">
      {t => (
        <div className='row'>
          <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-7 ${styles.left}`}>
            <Link to="/">
              <div className={styles['logo-container']}>
                <img className={styles.logo} src="/img/logo-white.svg" alt="Logo" data-test="logo" />
              </div>
            </Link>
            <h1 className={styles.heading}>{t('accounts.signupheader')}</h1>
          </div>
          <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-5 ${styles.right}`}>
            <Link to="/">
              <div className={`${styles['logo-container']} hidden-md hidden-lg hidden-xl`}>
                <img className={styles.logo} src="/img/logo.svg" alt="Logo" data-test="logo" />
              </div>
            </Link>
            <div className={`col-xs-8 col-offset-xs-2`}>
              <div className='alert alert-info' role='alert'>
                <strong>{t('accounts.registerationOptionalTitle')}</strong> {t('accounts.registerationOptional')} 
              </div>
              <br />
              <form className="form-group" onSubmit={onSubmit}>
                <div className={styles['input-container']}>
                  <input
                    type="text"
                    className={`form-control`}
                    id="username"
                    value={state.username}
                    onChange={setValue('username')}
                    placeholder={t('accounts.username')}
                    disabled={auth.loading}
                  />
                </div>
                <div className={styles['input-container']}>
                  <input
                    type="text"
                    className={`form-control`}
                    id="email"
                    value={state.email}
                    onChange={setValue('email')}
                    placeholder={t('accounts.email')}
                    disabled={auth.loading}
                  />
                </div>
                <div className={styles['input-container']}>
                  <input
                    type="password"
                    className={`form-control`}
                    id="password"
                    value={state.password}
                    onChange={setValue('password')}
                    placeholder={t('accounts.password')}
                    disabled={auth.loading}
                  />
                </div>
                <div className={styles['input-container']}>
                  <input
                    type="password"
                    className={`form-control`}
                    id="repeatPassword"
                    value={state.repeatPassword}
                    onChange={setValue('repeatPassword')}
                    placeholder={t('accounts.repeatpassword')}
                    disabled={auth.loading}
                  />
                </div>
                <div className={'input-container'}>&nbsp;</div>
                <div className={'input-container'}>
                  <Checkbox
                    disabled={auth.loading}
                    onChange={({target: { value, checked }}) => setValue('agreedTC')({target: { value: checked }})} >
                    Accept TOS
                  </Checkbox>
                </div>
                <div className={'input-container'}>
                  {state.error ? (<div className='alert alert-danger'>
                    <strong>Error:</strong> {t(`accounts.errors.${state.error}`)}
                  </div>) : <>&nbsp;</>}
                </div>
                <button 
                  type='submit'
                  disabled={auth.loading}
                  className={`${styles.button} ${styles.main}`}>{
                    !auth.loading ? t('accounts.signup') : 'Loading...'
                  }</button>
                </form>
              <div className={styles.separator}></div>
              <Link to="/signin" className={styles['not-registered']}>
                <button className={`${styles.button} ${styles.secondary}`}>{t('accounts.signin')}</button>
              </Link>
              <button 
                className={`${styles.button} ${styles.facebook}`}>{t('accounts.signupwithfacebook')}</button>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
}


const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ signUp }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
