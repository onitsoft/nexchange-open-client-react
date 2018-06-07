import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserEmail } from 'Actions';
import GetNotified from './images/get-notified.png';
import config from 'Config';
import styles from '../OrderCta.scss';

class OrderNotifications extends Component {
  state = {
    email: '',
    message: {
      text: '',
      error: false,
    },
    show: false,
  };

  componentDidMount() {
    axios
      .get(`${config.API_BASE_URL}/users/me/orders/${this.props.order.unique_reference}`)
      .then(data => {
        this.setState({ show: true });
      })
      .catch(error => {
        this.setState({ show: false });
      });

    if (this.props.email.value) {
      this.setState({
        email: this.props.email.value,
        emailFetched: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.email !== this.props.email) {
      if (this.props.email.message) {
        this.setState({ message: this.props.email.message });
      }

      if (this.props.email.value) {
        this.setState({
          email: this.props.email.value,
          emailFetched: true,
        });
      }
    }
  }

  handleChange = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.setUserEmail(this.state.email);
  };

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles['form-group']}>
          <input
            type="email"
            name="email"
            placeholder="Enter your e-mail address"
            onChange={this.handleChange}
            value={this.state.email}
            disabled={this.state.emailFetched}
            required
          />

          <button type="submit" className={`btn btn-primary ${styles.btn}`} disabled={this.state.emailFetched}>
            Submit
          </button>

          {this.state.message.text && <h4 className={styles.message}>{this.state.message.text}</h4>}
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

const mapStateToProps = ({ email }) => ({ email });
const mapDistachToProps = dispatch => bindActionCreators({ setUserEmail }, dispatch);

export default connect(
  mapStateToProps,
  mapDistachToProps
)(OrderNotifications);
