import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Marked from 'react-markdown'
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { requestPasswordReset, resetPassword } from 'Actions'

import { css } from 'emotion'
import { Modal } from 'react-bootstrap'
import { 
  emailCheck
} from '../'

import styles from '../Accounts.scss';

const RequestReset = (props) => {
  const { auth } = props
  const [showSuccessModal, setShowSuccessModal] = useState()
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

  const onHideModal = useCallback(() => setShowSuccessModal(false), [setShowSuccessModal])

  useEffect(() => {
    if (auth.error && !auth.loading && auth.error.email) {
      setError('accounts.errors.email')
    } else if (!auth.loading && auth.reset && auth.reset === 'Please check your E-mail') {
      setShowSuccessModal(true)
    }
  }, [auth])

  return (
    <I18n ns="translations">
      {(t, {lng}) => (
        <div className='row'>
          <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 ${styles.container}`}>
            <Link to={`/${lng}`}>
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

          <Modal show={showSuccessModal} onHide={onHideModal} dialogClassName={dialogStyle.toString()}>
            <Modal.Header closeButton>
              <Modal.Title>{t('accounts.requestResetPassword.successTitle')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Marked>{t('accounts.requestResetPassword.successBody')}</Marked>
            </Modal.Body>
            <Modal.Footer>
              <Link className={`btn-default btn`} to='/'>Home</Link>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </I18n>
  )
}

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
const mapDispatchToProps = dispatch => bindActionCreators({ requestPasswordReset, resetPassword }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestReset);
