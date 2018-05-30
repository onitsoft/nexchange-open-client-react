import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserEmail } from '../actions';
import config from '../config';

class Notifications extends Component {
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
                    <h4 className={this.state.message.error ? 'text-danger' : 'text-green'}>{this.state.message.text}</h4>

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

const mapStateToProps = ({ email }) => ({ email });
const mapDistachToProps = dispatch => bindActionCreators({ setUserEmail }, dispatch);

export default connect(
  mapStateToProps,
  mapDistachToProps
)(Notifications);
