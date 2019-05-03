import React, { Component } from 'react';
import axios from 'axios';
import config from 'Config';
import { validateWalletAddress } from 'Utils/walletAddress';
import { I18n } from 'react-i18next';
import i18n from '../../../i18n';

class OrderRefundAddress extends Component {
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
      .get(`${config.API_BASE_URL}/users/me/orders/${this.props.order.unique_reference}`)
      .then(() => {
        this.setState({ show: true });
      })
      .catch(() => {
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
              text: `${address} ${i18n.t('error.novalid')} ${this.props.order.pair.quote.code} ${i18n.t('exchangewidget.4')}`,
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
      .put(`${config.API_BASE_URL}/orders/${this.props.order.unique_reference}/`, {
        refund_address: this.state.address,
      })
      .then(data => {
        this.setState({
          message: {
            text: i18n.t('refund.7'),
            error: false,
          },
        });
      })
      .catch(() => {
        this.setState({
          message: {
            text: i18n.t('refund.8'),
            error: true,
          },
        });
      });
  }

  render() {
    if ([12, 13, 14, 15].indexOf(this.props.order.status_name[0][0]) === -1 || !this.state.show) {
      return null;
    }

    return (
      <I18n ns="translations">
        {t => (
          <div>
            <h2>{t('refund.10')}</h2>

            <div className="row">
              <div className="col-xs-12 col-md-8 col-md-push-2">
                <form onSubmit={this.handleSubmit}>
                  <h4 className={this.state.message.error ? 'text-danger' : 'text-green'}>{this.state.message.text}</h4>

                  <div className="form-group">
                    <input
                      type="text"
                      name="refund-address"
                      placeholder={t('refund.11')}
                      className="form-control"
                      value={this.state.address}
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-themed btn-lg" disabled={this.state.disabled}>
                    {t('refund.9')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default OrderRefundAddress;
