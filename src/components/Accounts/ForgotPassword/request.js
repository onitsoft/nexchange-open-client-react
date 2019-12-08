import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { requestPasswordReset, resetPassword } from 'Actions'

import { 
  emailCheck
} from '../'

import styles from '../Accounts.scss';

const RequestReset = (props) => {
  const { auth } = props
  const [email, setEmailState] = useState('')
  const [error, setError] = useState()

  const setEmail = useCallback(value => {
    setError()
    setEmailState(value)
  }, [setError, setEmailState])

  const onEmailChange = useCallback(({ target: { value } }) => setEmail(value), [setEmail])
  const onSubmit = useCallback((event) => {
    event.preventDefault()
    
    if (email && emailCheck.test(email)) {
      if (!auth.loading) props.requestPasswordReset(email)
    } else setError(`accounts.errors.email`)

  }, [email, auth])

  return (
    <I18n ns="translations">
      {t => (
        <div className='row'>
          <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 ${styles.container}`}>
            <Link to="/">
                <div className={styles['logo-container']}>
                    <img className={styles.logo} src="/img/logo-white.svg" alt="Logo" data-test="logo" />
                </div>
            </Link>
            <div className={`col-xs-12 col-sm-12 col-md-8 col-lg-6 ${styles['sub-container']}`}>
              <h3>{t('accounts.forgotpassword1')}</h3>
              <span>{t('accounts.forgotpassword2')}</span>
              <form className="form-group" onSubmit={onSubmit}>
                <div className={styles['input-container']}>
                  <input
                    type="text"
                    className={`form-control`}
                    id="email"
                    value={email}
                    onChange={onEmailChange}
                    placeholder={t('accounts.email')}
                    disabled={auth.loading}
                  />
                </div>
                {error && (
                  <div className={'input-container'}>
                    <strong>Error:</strong> {t(error)}
                  </div>
                )}
                {auth.resetError && (
                  <div className={'input-container'}>
                    <strong>Error:</strong>
                    {t(`accounts.errorKeys.email.${auth.resetError.toString()}`)}
                  </div>
                )}
                <div className={styles.resetPassword}>
                  <button disabled={auth.loading} type='submit' className={`${styles.button} ${styles.main}`}>
                    {!auth.loading ? t('accounts.resetpassword') : 'Loading...'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </I18n>
  )
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ requestPasswordReset, resetPassword }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestReset);
