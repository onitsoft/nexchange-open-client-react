import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import setUserEmail from '../helpers/setUserEmail';
import fetchUserEmail from '../helpers/fetchUserEmail';

class Notifications extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      message: {
        text: '',
        error: false,
      },
      show: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `${config.API_BASE_URL}/users/me/orders/${
          this.props.order.unique_reference
        }`
      )
      .then(data => {
        this.setState({ show: true });
      })
      .catch(error => {
        this.setState({ show: false });
      });

    fetchUserEmail(email => {
      this.setState({ email, emailFetched: email.length > 0 });
    });
  }

  handleChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    setUserEmail(
      this.state.email,
      () => {
        this.setState({
          message: {
            text: 'Success, you set your email.',
            error: false,
          },
        });
      },
      error => {
        const message = {
          text: 'Something went wrong. Try again later.',
          error: true,
        };

        if (error.response) {
          if (error.response.status === 401) {
            message.text =
              'You do not have access to get notifications for this order.';
          } else if (
            error.response.data &&
            error.response.data.email.length &&
            error.response.data.email[0]
          ) {
            message.text = error.response.data.email[0];
          }
        }

        this.setState({ message });
      }
    );
  }

  render() {
    if (this.state.show === false) {
      return null;
    }

    return (
      <div id="notifications" className="col-xs-12">
        <div className="box">
          <div className="row">
            <div className="col-xs-12">
              <h2>Get notified about your order!</h2>

              <div className="row">
                <div className="col-xs-12 col-md-8 col-md-push-2">
                  <form onSubmit={this.handleSubmit}>
                    <h4
                      className={
                        this.state.message.error ? 'text-danger' : 'text-green'
                      }
                    >
                      {this.state.message.text}
                    </h4>

                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        onChange={this.handleChange}
                        value={this.state.email}
                        disabled={this.state.emailFetched}
                        required
                      />
                      <span className="material-input" />
                    </div>

                    <button type="submit" className="btn btn-themed btn-lg">
                      Receive notifications
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;
