import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

import axios from 'axios'
import config from 'Config'

import { SalteAuth } from '@salte-auth/salte-auth';

import { Checkbox } from 'react-bootstrap'

import styles from '../Accounts.scss';

const serialize = function(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}


export const SignUp = (props) => {
  const [state, setState] = useState({
    username: 'onit',
    email: '',
    password: 'weare0nit',
    repeatPassword: '',
    agreedTC: false
  })

  useEffect(() => {
    $("#root").css({'padding-bottom': "0px"});

    console.log('Axios:', axios)

    return () => {
      $("#root").css({'padding-bottom': "114px"});
    }
  }, [])


  const signUp = (e) => {
    const client_secret = 
      `98L4ufYZ2iLXB3Ybwjy2XAKkem8sR3bMmtvjMKcg7o6sX2REmMax6ncAnvVIHwjEdRH2bH9aHYlkpzhlRkD3NqiAiEbA7CbcROplCPAsDPcxWEbnU63QSh7t6ZWgfzvI`
    e.preventDefault();
    console.log('our state:', state)
    // axios.post(`${config.API_BASE_URL}/oAuth2/token`, { params: {
    const params = {
      'grant_type': 'password',
      'client_id': config.AUTH_CLIENT_ID,
      'username': state.username,
      'password': state.password,
    }
    // client_secret:
    // `98L4ufYZ2iLXB3Ybwjy2XAKkem8sR3bMmtvjMKcg7o6sX2REmMax6ncAnvVIHwjEdRH2bH9aHYlkpzhlRkD3NqiAiEbA7CbcROplCPAsDPcxWEbnU63QSh7t6ZWgfzvI`
    console.log('params before sending', params, serialize(params))
    axios.post(`http://localhost:8000/en/api/v1/oAuth2/token/`, serialize(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      auth: {
          username: config.AUTH_CLIENT_ID,
          password: client_secret
      }

    })
    .then(d => {
      console.log('result of token request:', d)
    })
    .catch(err => {
      console.log('result of token is ERROR:', err)
    })
  }

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
              <form className="form-group" onSubmit={signUp}>
                    <div className={styles['input-container']}>
                      <input
                        type="text"
                        className={`form-control`}
                        id="username"
                        value={state.username}
                        onChange={({target: { value }}) => setState(st => ({...st, username: value}))}
                        placeholder={t('accounts.username')}
                      />
                    </div>
                    <div className={styles['input-container']}>
                      <input
                        type="text"
                        className={`form-control`}
                        id="email"
                        value={state.email}
                        onChange={({target: { value }}) => setState(st => ({...st, email: value}))}
                        placeholder={t('accounts.email')}
                      />
                    </div>
                    <div className={styles['input-container']}>
                      <input
                      type="password"
                      className={`form-control`}
                      id="password"
                      value={state.password}
                      onChange={({target: { value }}) => setState(st => ({...st, password: value}))}
                      placeholder={t('accounts.password')}
                      />
                    </div>
                    <div className={styles['input-container']}>
                      <input
                      type="password"
                      className={`form-control`}
                      id="repeatPassword"
                      value={state.repeatPassword}
                      onChange={({target: { value }}) => setState(st => ({...st, repeatPassword: value}))}
                      placeholder={t('accounts.repeatpassword')}
                      />
                    </div>
                    <div className={'input-container'}>
                      &nbsp;
                    </div>
                    <div className={'input-container'}>
                      {/* <input
                      type="checkbox"
                      className={`form-control`}
                      id="repeatPassword"
                      value={state.repeatPassword}
                      onChange={({target: { value }}) => setState(st => ({...st, repeatPassword: value}))}
                      placeholder={t('accounts.repeatpassword')}
                      /> */}
                      <Checkbox
                        onChange={({target: { value, checked }}) => setState(st => ({...st, agreedTC: checked}))}>
                        Accept TOS
                      </Checkbox>
                    </div>
                    <div className={'input-container'}>
                      &nbsp;
                    </div>
                    <button 
                      type='submit'
                      className={`${styles.button} ${styles.main}`}>{t('accounts.signup')}</button>
                </form>
              <div className={styles.separator}></div>
              <button 
                className={`${styles.button} ${styles.facebook}`}>{t('accounts.signupwithfacebook')}</button>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
}

export default SignUp;
