import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import config from '../config';
import validateWalletAddress from '../helpers/validateWalletAddress';
import Box from '../components/Box';

class RefundAddress extends Component {
  constructor(props) {
    super();
    this.state = {
      address: '',
      message: {
        text: '',
        error: '',
      },
      disabled: true,
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
  }

  handleChange(event) {
    const address = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    this.setState({ address });

    if (address.length > 0) {
      validateWalletAddress(
        address,
        this.props.order.pair.quote.code,
        () => {
          this.setState({
            message: {
              text: `${address} is not a valid ${
                this.props.order.pair.quote.code
              } address`,
              error: 'error',
            },
          });
        },
        () => {
          this.setState({
            disabled: false,
            message: {
              text: '',
              error: '',
            },
          });
        }
      );
    } else {
      this.setState({
        disabled: true,
        message: {
          text: '',
          error: '',
        },
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .put(
        `${config.API_BASE_URL}/orders/${this.props.order.unique_reference}/`,
        {
          refund_address: this.state.address,
        }
      )
      .then(data => {
        this.setState({
          message: {
            text: 'Success, you set a refund address.',
            error: false,
          },
        });
      })
      .catch(error => {
        this.setState({
          message: {
            text: 'Something went wrong. Try again later.',
            error: true,
          },
        });
      });
  }

  render() {
    if (
      [11, 12, 13, 14, 15].indexOf(this.props.order.status_name[0][0]) === -1 ||
      !this.state.show
    ) {
      return null;
    }

    return (
      <Box id="refund-box">
        <h2>Refund address</h2>

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
                  type="text"
                  name="refund-address"
                  placeholder="Refund address"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-themed btn-lg"
                disabled={this.state.disabled}
              >
                Set refund address
              </button>
            </form>
          </div>
        </div>
      </Box>
    );
  }
}

export default RefundAddress;
