import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

import styles from '../Accounts.scss';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreedTC: false
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
                          id="username"
                          value={this.state.username}
                          onChange={event => this.setState({username: event.target.value})}
                          placeholder={'Username'}
                        />
                      </div>
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
                      <div className={styles['input-container']}>
                        <input
                        type="password"
                        className={`form-control`}
                        id="repeatPassword"
                        value={this.state.repeatPassword}
                        onChange={event => this.setState({repeatPassword: event.target.value})}
                        placeholder={'Repeat Password'}
                        />
                      </div>
                      <button className={`${styles.button} ${styles.main}`}>Sign up</button>
                  </form>
                <div className={styles.separator}></div>
                <button className={`${styles.button} ${styles.facebook}`}>Sign Up with facebook</button>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default SignUp;
