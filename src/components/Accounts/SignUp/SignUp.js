import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { css } from 'emotion'
import styled from '@emotion/styled'
import Marked from 'react-markdown'

import { signUp, signIn, completeRegistration } from 'Actions'

import { Checkbox, Modal } from 'react-bootstrap'

import { 
  passCheck,
  usernameCheck,
  emailCheck
} from '../'


import styles from '../Accounts.scss';

export const SignUp = (props) => {
  const { auth } = props
  const [showSuccessModal, setShowSuccessModal] = useState()
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

  const onHideModal = useCallback(() => setShowSuccessModal(false), [])

  useEffect(() => {
    if (auth.registered) {
      if (!auth.complete && !auth.loading && !auth.loggedIn) {
        props.signIn(auth.signup.username, auth.signup.password)
      } else if (!auth.complete && !auth.loading) {
        props.completeRegistration()
      } else if (auth.complete) {
        setShowSuccessModal(true)
      }
    } else if (auth.signup && auth.signup.error) {
      if (Object.keys(auth.signup.error).length) {
        const [error] = Object.keys(auth.signup.error)
        const errorKey = (auth.signup.error[error][0]).replace('.', '')
        setState(st => ({ ...st, error, errorKey }))
      } else {
        const error = 'general'
        const errorKey = (auth.signup.error).replace('.', '')
        setState(st => ({ ...st, error, errorKey }))
      }
    }
  }, [auth])

  const ErrorMessage = useMemo(() => {
    return (props) => <ErrorBlock {...state} {...props} />
  }, [state])

  const myError = useCallback((name) => `ief ${name === state.error ? 'error' : ''}`, [state.error])
  
  return (
    <I18n ns="translations">
      {(t, {lng} )=> (
        <StyledSignup>
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
                  <strong>{t('accounts.registerationOptionalTitle')}</strong>
                  <Marked>{t('accounts.registerationOptional')}</Marked>
                </div>
                <br />
                <form className="form-group" onSubmit={onSubmit}>
                  <>
                    <div className={`${styles['input-container']} ${myError('username')}`}>
                      <input
                        type={'text'}
                        className={`form-control`}
                        id={'username'}
                        value={state['username']}
                        onChange={setValue('username')}
                        placeholder={t(`accounts.${'username'}`)}
                        disabled={auth.loading}
                      />
                    </div>
                    {state.error  === 'username' && <ErrorBlock {...state} />}

                    <div className={`${styles['input-container']} ${myError('email')}`}>
                      <input
                        type={'email'}
                        className={`form-control`}
                        id={'email'}
                        value={state['email']}
                        onChange={setValue('email')}
                        placeholder={t(`accounts.${'email'}`)}
                        disabled={auth.loading}
                      />
                    </div>
                    {state.error  === 'email' && <ErrorBlock {...state} />}

                    <div className={`${styles['input-container']} ${myError('password')}`}>
                      <input
                        type={'password'}
                        className={`form-control`}
                        id={'password'}
                        value={state['password']}
                        onChange={setValue('password')}
                        placeholder={t(`accounts.${'password'}`)}
                        disabled={auth.loading}
                      />
                    </div>
                    {state.error  === 'password' && <ErrorBlock {...state} />}

                    <div className={`${styles['input-container']} ${myError('repeatPassword')}`}>
                      <input
                        type={'password'}
                        className={`form-control`}
                        id={'repeatPassword'}
                        value={state['repeatPassword']}
                        onChange={setValue('repeatPassword')}
                        placeholder={t(`accounts.${'repeatPassword'}`)}
                        disabled={auth.loading}
                      />
                    </div>
                    {state.error  === 'repeatPassword' && <ErrorBlock {...state} />}
                  </>
                  
                  <div className={'input-container'}>&nbsp;</div>
                  <div className={`${myError('agreedTC')}`}>
                    <Checkbox
                      disabled={auth.loading}
                      checked={state.agreedTC}
                      onChange={({target: { checked }}) =>
                        console.log('is checked?', checked) ||
                        setValue('agreedTC')({target: { value: checked }})
                      } >
                      Accept TOS
                    </Checkbox>
                  </div>
                  {state.error  === 'agreedTC' && <ErrorMessage usekey />}
                  {state.error  === 'general' && <ErrorMessage />}

                  <button 
                    type='submit'
                    disabled={auth.loading}
                    className={`${styles.button} ${styles.main}`}>{
                      !auth.loading ? t('accounts.signup') : 'Loading...'
                    }</button>
                  </form>
                <div className={styles.separator}></div>
                <Link to={`/${lng}/signin`} className={styles['not-registered']}>
                  <button className={`${styles.button} ${styles.secondary}`}>{t('accounts.signin')}</button>
                </Link>
                {/* <button className={`${styles.button} ${styles.facebook}`}>{t('accounts.signupwithfacebook')}</button> */}
              </div>
            </div>


            <Modal show={showSuccessModal} onHide={onHideModal} dialogClassName={dialogStyle.toString()}>
              <Modal.Header closeButton>
                <Modal.Title>{t('accounts.register.successTitle')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p>{t('accounts.register.successBody')}</p>
              </Modal.Body>
              <Modal.Footer>
                <Link className={`btn-primary btn`} to='/'>Home</Link>
              </Modal.Footer>
            </Modal>
          </div>
        </StyledSignup>
      )}
    </I18n>
  );
}

const StyledSignup = styled.div`
  padding: 0 15px;
  .ief {
    &.error {
      border: 1px solid #e41749;
      border
    }
  }
`

const ErrorBlock = ({ error, errorKey, usekey}) => {
  const nokey = (typeof usekey !== 'undefined')
  return (
    <I18n ns="translations">
      {t => (
        <StyledFormError className={'input-container'}>
          {error
            ? !errorKey || nokey
              ? (<div className='msg'>
                <strong>Error:</strong> {t(`accounts.errors.${error}`)}
                </div>)

              : (<div className='msg'>
                    <strong>Error:</strong> {t(`accounts.errorKeys.${error}.${errorKey}`)}
                  </div>)
            : <>&nbsp;</>
          }
        </StyledFormError>
      )}
    </I18n>
  )
}

const StyledFormError = styled.div`
  .msg {
    margin: 0 0 1rem;
    border-radius: 4px;
    padding: .25rem 1rem;
    color: #e41749;
  }
`

const dialogStyle = css`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  > .modal-content {
    min-width: 320px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    > .modal-body {
      flex: 1 1 auto;
    }
    > .modal-footer {
      > .btn {
        margin-bottom: 0;
      }
    }
  }
`


const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ signUp, signIn, completeRegistration }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
