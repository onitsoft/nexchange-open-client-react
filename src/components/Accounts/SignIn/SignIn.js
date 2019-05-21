import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

import styles from '../Accounts.scss';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
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
            <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-7 ${styles.left}`}>
              <Link to="/">
                <div className={styles['logo-container']}>
                  <img className={styles.logo} src="/img/logo-white.svg" alt="Logo" data-test="logo" />
                </div>
              </Link>
            </div>
            <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-5 ${styles.right}`}>
              <div className={`col-xs-8 col-offset-xs-2`}>
                <form className="form-group">
                      <div className={styles['input-container']}>
                        <input
                          type="text"
                          className={`form-control`}
                          id="email"
                          value={this.state.email}
                          onChange={event => this.setState({email: event.target.value})}
                          placeholder={'Email'}
                        />
                      </div>
                      <div className={styles['input-container']}>
                      <input
                        type="password"
                        className={`form-control`}
                        id="password"
                        value={this.state.password}
                        onChange={event => this.setState({password: event.target.value})}
                        placeholder={'Password'}
                        />
                      </div>
                      <button className={`${styles.button} ${styles.main}`}>Sign in</button>
                  </form>
                <Link to="/forgotpassword" className={styles['not-registered']}>
                  <div>Forgot your password?</div>
                </Link>
                <div className={styles.separator}></div>
                <Link to="/signup" className={styles['not-registered']}>
                  <button className={`${styles.button} ${styles.secondary}`}>Sign up</button>
                </Link>
                <button className={`${styles.button} ${styles.facebook}`}>Sign in with facebook</button>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default SignIn;
