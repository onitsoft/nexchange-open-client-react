import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

import styles from '../Accounts.scss';

class ForgotPassword extends Component {
  state = {
    email: ''
  }

  componentDidMount() {
    $("#root").css({'padding-bottom': "0px"});
  }

  componentWillUnmount() {
    $("#root").css({'padding-bottom': "114px"});
  }

  render() {
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
                    <form className="form-group">
                      <div className={styles['input-container']}>
                        <input
                          type="text"
                          className={`form-control`}
                          id="email"
                          value={this.state.email}
                          onChange={event => this.setState({email: event.target.value})}
                          placeholder={t('accounts.email')}
                        />
                      </div>
                      <div className={styles.resetPassword}>
                        <button className={`${styles.button} ${styles.main}`}>{t('accounts.resetpassword')}</button>
                      </div>
                    </form>
                </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default ForgotPassword;
