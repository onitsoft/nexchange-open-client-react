import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchKyc } from '../../actions';
import config from '../../config';
import KYCModalTier0 from './KYCModalTier0';
import KYCModalTier1 from './KYCModalTier1';
import KYCModalTier2 from './KYCModalTier2';
import OrderPaymentTemplate from './OrderPaymentTemplate';

class OrderPayment extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchKyc(this.props.order.unique_reference);
  }

  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps.kyc);
    return nextProps;
  }

  componentDidUpdate() {
    this.timeout = setTimeout(() => {
      this.props.fetchKyc(this.props.order.unique_reference);
    }, config.KYC_DETAILS_FETCH_INTERVAL);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    if (!this.props.kyc) {
      return (
        <div className="col-xs-12 text-center order-status-section">
          <h2>Checking KYC status...</h2>
        </div>
      );
    }

    let title;
    let inner;
    let buttonText;
    let modal;
    let notificationsCtaVisible = false;

    if (!this.props.kyc.is_verified) {
      const { residence_document_status, id_document_status } = this.props.kyc;

      if (id_document_status === 'UNDEFINED' && residence_document_status === 'UNDEFINED') {
        title = <h2>Awaiting verification</h2>;
        inner = (
          <div>
            <h5>
              In order to proceed further we must get to know you better by getting a copy of your government issued ID and a proof of
              residence.
            </h5>

            <h5 style={{ marginTop: 15 }}>
              <b>
                This is a one-time process, once verified you’ll be able to complete future purchases instantly until current verification
                tier limit is reached.
              </b>
            </h5>
          </div>
        );

        modal = KYCModalTier0;
        buttonText = 'Get verified';
      } else {
        title = <h2>Verification received, awaiting approval</h2>;
        inner = (
          <div>
            <hr style={{ margin: '15px -15px' }} />
            <h2>Approval status:</h2>
            <p style={{ margin: 0 }}>
              <b>Government issued ID:</b> {id_document_status}
            </p>
            <p>
              <b>Proof of residence:</b> {residence_document_status}
            </p>
          </div>
        );

        notificationsCtaVisible = true;
        modal = KYCModalTier0;

        if (id_document_status === 'REJECTED' || residence_document_status === 'REJECTED') {
          buttonText = 'Retry verification';
        }
      }
    } else if (this.props.kyc.out_of_limit) {
      title = <h2>Tier limits reached, additional verification needed</h2>;

      const tier = this.props.kyc.limits_message.tier.name;
      const { selfie_document_status, whitelist_selfie_document_status } = this.props.kyc;

      if (tier === 'Tier 1') {
        modal = KYCModalTier1;
      } else if (tier === 'Tier 2') {
        modal = KYCModalTier2;
      }

      if (
        (tier === 'Tier 1' && selfie_document_status === 'UNDEFINED') ||
        (tier === 'Tier 2' && whitelist_selfie_document_status === 'UNDEFINED')
      ) {
        inner = (
          <div>
            <h5>{this.props.kyc.limits_message.tier.upgrade_note}</h5>
            <h5 style={{ marginTop: 15 }}>
              <b>
                This is a one-time process, once verified you’ll be able to complete future purchases instantly until current verification
                tier limits are reached.
              </b>
            </h5>
          </div>
        );

        buttonText = 'Get verified';
      } else {
        title = <h2>Verification received, awaiting approval</h2>;
        inner = (
          <div>
            <hr style={{ margin: '15px -15px' }} />
            <h2>Approval status:</h2>

            {tier === 'Tier 1' && (
              <p>
                <b>Selfie:</b> {selfie_document_status}
              </p>
            )}
            {tier === 'Tier 2' && (
              <p>
                <b>Whitelist selfie:</b> {whitelist_selfie_document_status}
              </p>
            )}
          </div>
        );

        if (selfie_document_status === 'REJECTED' || whitelist_selfie_document_status === 'REJECTED') {
          buttonText = 'Retry verification';
        }

        notificationsCtaVisible = true;
      }
    } else {
      title = <h2>Payment and verification received</h2>;
      inner = <h5>We will proceed to release your funds shortly</h5>;
    }

    return (
      <OrderPaymentTemplate
        title={title}
        notificationsCtaVisible={notificationsCtaVisible}
        buttonText={buttonText}
        modal={modal}
        {...this.props}
      >
        {inner}
      </OrderPaymentTemplate>
    );
  }
}

const mapStateToProps = ({ kyc }) => ({ kyc });

const mapDistachToProps = dispatch => bindActionCreators({ fetchKyc }, dispatch);

export default connect(mapStateToProps, mapDistachToProps)(OrderPayment);
