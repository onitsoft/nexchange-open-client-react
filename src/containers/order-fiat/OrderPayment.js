import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import KYCModalTier1 from './KYCModalTier1';
import KYCModalTier2 from './KYCModalTier2';
import DesktopNotifications from '../DesktopNotifications';

class OrderPayment extends Component {
  constructor(props) {
    super(props);
    this.state = { showKYCModal: false };
    this.checkKYC = this.checkKYC.bind(this);
  }

  componentDidMount() {
    this.checkKYC(true);
  }

  checkKYC(shouldOpen) {
    clearTimeout(this.timeout);

    axios
      .get(`${config.API_BASE_URL}/kyc/${this.props.order.unique_reference}`)
      .then(response => {
        const kyc = response.data;
        this.setState({ kyc });

        if (
          shouldOpen &&
          (!kyc.selfie_document_status || !kyc.residence_document_status)
        ) {
          setTimeout(() => {
            this.setState({ showKYCModal: true });
          }, 1000);
        }

        this.timeout = setTimeout(() => {
          this.checkKYC();
        }, config.KYC_DETAILS_FETCH_INTERVAL);
      })
      .catch(error => {
        this.timeout = setTimeout(() => {
          this.checkKYC();
        }, config.KYC_DETAILS_FETCH_INTERVAL);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    let inner;
    let buttonText;
    let notificationsCtaVisible = false;

    if (!this.state.kyc) {
      inner = <h2>Checking KYC status...</h2>;
    } else if (this.state.kyc.out_of_limit) {
      const tier = this.state.kyc.limits_message.tier.name;
      const {
        selfie_document_status,
        whitelist_selfie_document_status,
      } = this.state.kyc;

      if (
        (tier === 'Tier 1' && selfie_document_status === 'UNDEFINED') ||
        (tier === 'Tier 2' && whitelist_selfie_document_status === 'UNDEFINED')
      ) {
        inner = (
          <div>
            <h2>
              Verification {tier} reached, awaiting additional verification
            </h2>
            <h5>{this.state.kyc.limits_message.tier.upgrade_note}</h5>
            <h5 style={{ marginTop: 15 }}>
              <b>
                This is a one-time process, once verified you’ll be able to
                complete future purchases instantly until current verification
                tier limits are reached.
              </b>
            </h5>
          </div>
        );

        buttonText = 'Get verified';
      } else {
        inner = (
          <div>
            <h2>Verification received, awaiting approval</h2>

            <hr style={{ marginLeft: -15, marginRight: -15 }} />

            <h2>Approval status:</h2>

            {tier === 'Tier 1' ? (
              <p>
                <b>Selfie:</b> {this.state.kyc.selfie_document_status}
              </p>
            ) : (
              <p>
                <b>Whitelist selfie:</b>{' '}
                {this.state.kyc.whitelist_selfie_document_status}
              </p>
            )}

            {this.state.kyc &&
              this.state.kyc.user_visible_comment && (
                <p>
                  <b>
                    Reason for rejection: {this.state.kyc.user_visible_comment}
                  </b>
                </p>
              )}
          </div>
        );

        notificationsCtaVisible = true;

        if (this.state.kyc.selfie_document_status === 'REJECTED') {
          buttonText = 'Retry verification';
        }
      }
    } else if (this.state.kyc.selfie_document_status === 'APPROVED') {
      inner = [
        <h2 key="title">Payment & verification received</h2>,
        <h5 key="subtitle">We are now preparing to release your coins</h5>,
      ];
    }

    return (
      <div className="col-xs-12 text-center order-status-section">
        {inner}

        <DesktopNotifications
          kyc={this.state.kyc}
          {...this.props}
          visible={notificationsCtaVisible}
        />

        {buttonText && (
          <button
            type="button"
            className="btn btn-default btn-themed"
            onClick={() => this.setState({ showKYCModal: true })}
            style={{ marginTop: 20 }}
          >
            <i
              className="fa fa-credit-card"
              aria-hidden="true"
              style={{ position: 'relative', left: -13 }}
            />
            {buttonText}
          </button>
        )}

        {this.state.kyc &&
          this.state.kyc.limits_message.tier.name === 'Tier 1' && (
            <KYCModalTier1
              show={this.state.showKYCModal}
              onClose={() => {
                this.setState({ showKYCModal: false });
                this.checkKYC();
              }}
              kyc={this.state.kyc}
              {...this.props}
            />
          )}

        {this.state.kyc &&
          this.state.kyc.limits_message.tier.name === 'Tier 2' && (
            <KYCModalTier2
              show={this.state.showKYCModal}
              onClose={() => {
                this.setState({ showKYCModal: false });
                this.checkKYC();
              }}
              kyc={this.state.kyc}
              {...this.props}
            />
          )}
      </div>
    );
  }
}

export default OrderPayment;
