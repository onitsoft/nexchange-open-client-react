import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import { css } from 'emotion';
import styled from '@emotion/styled';

import { signUp, signIn, completeRegistration } from 'Actions';

import styles from '../Accounts.scss';
import CountryStateSelect from '../components/Select/CountryStateSelect';
import { isUserResidenceLocationLegal } from '../../../utils/restrictedCountires/restirctionCheck';
import { loadUserDetails } from '../../../actions';
import { setResidenceLocation } from '../../../utils/restrictedCountires/residenceLocationStorage';

export const EditResidenceLocation = props => {
  const { auth } = props;

  const [showSuccessModal, setShowSuccessModal] = useState();
  const [state, setState] = useState({
    residenceLocation: {
      country: null,
      state: null,
      isStateRequired: false,
    },
  });

  useEffect(() => {
    $('#root').css({ 'padding-bottom': '0px' });

    return () => {
      $('#root').css({ 'padding-bottom': '114px' });
    };
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      if (!state.residenceLocation.country) {
        setState(st => ({ ...st, error: 'residenceLocation.country' }));
      } else if (!state.residenceLocation.state && state.residenceLocation.isStateRequired) {
        setState(st => ({ ...st, error: 'residenceLocation.state' }));
      } else {
        setResidenceLocation(auth.profile.username, state.residenceLocation);
        setShowSuccessModal(true);
      }
    },
    [state]
  );

  const setResidenceLocationValue = residenceLocationDto => {
    setState(state => ({
      ...state,
      residenceLocation: residenceLocationDto,
    }));
  };

  const onHideModal = useCallback(() => setShowSuccessModal(false), []);

  const ErrorMessage = useMemo(() => {
    return props => <ErrorBlock {...state} {...props} />;
  }, [state]);

  const myError = useCallback(name => `ief ${name === state.error ? 'error' : ''}`, [state.error]);

  return (
    <I18n ns="translations">
      {(t, { lng }) => (
        <StyledSignup>
          <div className="row">
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
                <form className="form-group" onSubmit={onSubmit}>
                  <h4>Residence Location</h4>

                  <CountryStateSelect myError={myError} setValue={setResidenceLocationValue} value={state.residenceLocation} />

                  {(state.error === 'residenceLocation.country' || state.error === 'residenceLocation.state') && (
                    <StyledFormError className={'input-container'}>
                      <div className="msg">
                        <strong>Error: Field is required</strong>
                      </div>
                    </StyledFormError>
                  )}

                  <div className={'input-container'}>&nbsp;</div>
                  {state.error === 'general' && <ErrorMessage />}

                  <button type="submit" className={`${styles.button} ${styles.main}`}>
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <Modal show={showSuccessModal} onHide={onHideModal} dialogClassName={dialogStyle.toString()}>
              <Modal.Header closeButton>
                <Modal.Title>{t('accounts.register.successTitle')}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>{t('accounts.register.successBody')}</p>
                {!isUserResidenceLocationLegal(state.residenceLocation) && (
                  <>
                    <h4>WARNING !</h4>
                    <p>
                      We could not provide our service in you current residence location. You can find more in{' '}
                      <a href="/terms-and-conditions" target="_blank">
                        Terms and Conditions
                      </a>
                      . If you have any questions please contact our support by intercom chat or{' '}
                      <a href="mailto:support@nexchange.co.uk">support@nexchange.co.uk</a>
                    </p>
                  </>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Link className={`btn-primary btn`} to="/">
                  Home
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
        </StyledSignup>
      )}
    </I18n>
  );
};

const StyledSignup = styled.div`
  padding: 0 15px;
  .ief {
    &.error {
      border: 1px solid #e41749;
    }
  }
`;

const ErrorBlock = ({ error, errorKey, usekey }) => {
  const nokey = typeof usekey !== 'undefined';
  return (
    <I18n ns="translations">
      {t => (
        <StyledFormError className={'input-container'}>
          {error ? (
            !errorKey || nokey ? (
              <div className="msg">
                <strong>Error:</strong> {t(`accounts.errors.${error}`)}
              </div>
            ) : (
              <div className="msg">
                <strong>Error:</strong> {t(`accounts.errorKeys.${error}.${errorKey}`)}
              </div>
            )
          ) : (
            <>&nbsp;</>
          )}
        </StyledFormError>
      )}
    </I18n>
  );
};

const StyledFormError = styled.div`
  .msg {
    margin: 0 0 1rem;
    border-radius: 4px;
    padding: 0.25rem 1rem;
    color: #e41749;
  }
`;

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
const mapDispatchToProps = dispatch => bindActionCreators({ signUp, signIn, completeRegistration }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditResidenceLocation);
