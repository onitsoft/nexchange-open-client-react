import React, { Component } from 'react';
import GetNotified from './images/get-notified.png';
import styles from '../OrderCta.scss';

class OrderNotifications extends Component {
  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className={styles['form-group']}>
          <input
            type="email"
            name="email"
            placeholder="Enter your e-mail address"
            onChange={this.props.handleChange}
            value={this.props.email}
            disabled={this.props.emailFetched}
            required
          />

          <button type="submit" className={`btn btn-primary ${styles.btn}`} disabled={this.props.emailFetched}>
            Submit
          </button>

          {this.props.message.text && <h4 className={styles.message}>{this.props.message.text}</h4>}
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className={`box ${styles.container}`}>
          <div className="row">
            <div className="col-xs-12 visible-xs text-center">
              <img className={styles.img} src={GetNotified} alt="Get notified" />
            </div>

            <div className={`col-xs-12 col-sm-7 ${styles.text}`}>
              <h2 className={styles.title}>If you would like to be notified about your order please enter your e-mail address below.</h2>
              {this.renderForm()}
            </div>

            <div className="col-ms-2 col-sm-5 hidden-xs text-center">
              <img className={styles.img} src={GetNotified} alt="Get notified" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderNotifications;
