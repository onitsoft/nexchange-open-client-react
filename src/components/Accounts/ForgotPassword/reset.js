import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import Marked from 'react-markdown';
import { css } from 'emotion';
import { Modal } from 'react-bootstrap';
import { requestPasswordReset, resetPassword } from 'Actions';

import { passCheck } from '../';

import styles from '../Accounts.scss';

export const NewPassword = props => {
  const [showSuccessModal, setShowSuccessModal] = useState();
  const { auth, resetToken } = props;
  const [errorFor, setErrorFor] = useState('');
  const [state, setState] = useState({
    password: '',
    passwordRepeat: '',
  });

  const onChange = useCallback(
    name => ({ target: { value } }) => {
      setState(st => ({ ...st, [name]: value }));
      if (name === errorFor) setErrorFor('');
    },
    [setState, errorFor, state, setErrorFor]
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();

      if (!state.password || !passCheck.test(state.password)) {
        setErrorFor('password');
      } else if (state.password !== state.passwordRepeat || !state.passwordRepeat) {
        setErrorFor('passwordRepeat');
      } else {
        props.resetPassword(resetToken, state.password);
      }
    },
    [props.resetPassword, state]
  );

  const onHideModal = useCallback(() => setShowSuccessModal(false), []);

  useEffect(() => {
    if (auth.passwordReset && !showSuccessModal) setShowSuccessModal(true);
  }, [auth]);

  return (
    <I18n ns="translations">
      {(t, { lng }) => (
        <div className="row">
          <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 ${styles.container}`}>
            <Link to={`/${lng}`}>
              <div className={styles['logo-container']}>
                <img className={styles.logo} src="/img/logo-white.svg" alt="Logo" data-test="logo" />
              </div>
            </Link>
            <div className={`col-xs-12 col-sm-12 col-md-8 col-lg-6 ${styles['sub-container']}`}>
              <h3>{t('accounts.resetpassword')}</h3>
              <span>{t('accounts.resetPasswordBody')}</span>
              <form className="form-group" onSubmit={onSubmit}>
                <div className={`${styles['input-container']} ${errorFor && errorFor === 'password' && 'error'}`}>
                  <input
                    type="password"
                    className={`form-control`}
                    id="password"
                    value={state.password}
                    onChange={onChange('password')}
                    placeholder={t('accounts.password')}
                    disabled={auth.loading}
                  />
                </div>
                {errorFor && errorFor === 'password' && (
                  <div className={'input-container'}>
                    <strong>Error:</strong>
                    {t(`accounts.errors.${errorFor}`)}
                  </div>
                )}
                <div className={`${styles['input-container']} ${errorFor && errorFor === 'passwordRepeat' && 'error'}`}>
                  <input
                    type="password"
                    className={`form-control`}
                    id="passwordRepeat"
                    value={state.passwordRepeat}
                    onChange={onChange('passwordRepeat')}
                    placeholder={t('accounts.repeatPassword')}
                    disabled={auth.loading}
                  />
                </div>
                {errorFor && errorFor === 'passwordRepeat' && (
                  <div className={'input-container'}>
                    <strong>Error:</strong>
                    {t(`accounts.errors.${errorFor}`)}
                  </div>
                )}
                {auth.error && (
                  <div className={'input-container'}>
                    <strong>Error:</strong>
                    {t(`accounts.errorKeys.general.${auth.error}`)}
                  </div>
                )}
                <div className={styles.resetPassword}>
                  <button disabled={auth.loading} type="submit" className={`${styles.button} ${styles.main}`}>
                    {!auth.loading ? t('continue') : `${t('loading')}...`}
                  </button>
                </div>
              </form>

              <Modal show={showSuccessModal} onHide={onHideModal} dialogClassName={dialogStyle.toString()}>
                <Modal.Header closeButton>
                  <Modal.Title>{t('accounts.resetPassword.successTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Marked>{t('accounts.resetPassword.successBody')}</Marked>
                </Modal.Body>
                <Modal.Footer>
                  <Link className={`btn-primary btn`} to={`/${lng}/signin`}>
                    Sign In
                  </Link>
                  <Link className={`btn-default btn`} to={`/${lng}`}>
                    Home
                  </Link>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

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
`;

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ requestPasswordReset, resetPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
