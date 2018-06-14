import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchKyc } from 'Actions';
import config from 'Config';
import KYCModalTier0 from '../OrderFiatModals/KYCModalTier0/KYCModalTier0';
import KYCModalTier1 from '../OrderFiatModals/KYCModalTier1/KYCModalTier1';
import KYCModalTier2 from '../OrderFiatModals/KYCModalTier2/KYCModalTier2';
import OrderPaymentTemplate from './OrderPaymentTemplateFiat/OrderPaymentTemplateFiat';
import OrderStateLoader from '../OrderIcons/OrderStateLoader/OrderStateLoader';
import styles from '../OrderState.scss';

class OrderPayment extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchKyc(this.props.order.unique_reference);
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps;
  }

  componentDidUpdate() {
    clearTimeout(this.timeout);

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
        <div className="text-center order-status-section">
          <h2>Checking KYC status...</h2>
        </div>
      );
    }

    let title;
    let inner;
    let buttonText;
    let modal;
    let notificationsCtaVisible = false;
    let showInitial = false;

    if (!this.props.kyc.is_verified) {
      const { residence_document_status, id_document_status } = this.props.kyc;

      if (id_document_status === 'UNDEFINED' && residence_document_status === 'UNDEFINED') {
        title = <h2 className={styles.title}>Awaiting verification</h2>;
        inner = (
          <div>
            <h3 className={styles.subtitle}>
              In order to proceed further we must get to know you better by getting a copy of your government issued ID and a proof of
              residence.
            </h3>

            <h3 className={styles.subtitle}>
              <b>
                This is a one-time process, once verified you’ll be able to complete future purchases instantly until current verification
                tier limit is reached.
              </b>
            </h3>
          </div>
        );

        modal = KYCModalTier0;
        buttonText = 'Get verified';
        showInitial = true;
      } else {
        title = (
          <div>
            <OrderStateLoader />
            <h2 className={styles.title}>Verification received, awaiting approval</h2>
          </div>
        );
        inner = (
          <div>
            <h2 className={styles.title}>Approval status:</h2>
            <div className={styles.status}>
              <p>
                <b>Government issued ID:</b> {id_document_status}
              </p>
              <p>
                <b>Proof of residence:</b> {residence_document_status}
              </p>
            </div>
          </div>
        );

        notificationsCtaVisible = true;
        modal = KYCModalTier0;

        if (id_document_status === 'REJECTED' || residence_document_status === 'REJECTED') {
          buttonText = 'Retry verification';
          showInitial = true;
        }
      }
    } else if (this.props.kyc.out_of_limit) {
      title = <h2 className={styles.title}>Tier limits reached, additional verification needed</h2>;

      const tier = this.props.kyc.limits_message.tier.name;
      const { selfie_document_status, whitelist_selfie_document_status } = this.props.kyc;
      const withdrawAddressStatus = this.props.kyc.limits_message.whitelisted_addresses_info[this.props.order.withdraw_address.address];

      if (
        (tier === 'Tier 1' && selfie_document_status === 'UNDEFINED') ||
        (tier === 'Tier 2' && whitelist_selfie_document_status === 'UNDEFINED')
      ) {
        inner = (
          <div>
            <h3 className={styles.subtitle}>
              <b>
                This is a one-time process, once verified you’ll be able to complete future purchases instantly until current verification
                tier limits are reached.
              </b>
            </h3>
          </div>
        );

        modal = tier === 'Tier 1' ? KYCModalTier1 : KYCModalTier2;
        buttonText = 'Get verified';
        showInitial = true;
      } else if (tier === 'Tier 3' && (withdrawAddressStatus !== 'PENDING' && withdrawAddressStatus !== 'REJECTED')) {
        inner = (
          <div>
            <h3 className={styles.subtitle}>
              <b>
                This is a one-time process, once verified you’ll be able to complete future purchases for this withdrawal address instantly.
              </b>
            </h3>
          </div>
        );

        modal = KYCModalTier2;
        buttonText = 'Get verified';
        showInitial = true;
      } else {
        title = (
          <div>
            <OrderStateLoader />
            <h2 className={styles.title}>Verification received, awaiting approval</h2>
          </div>
        );
        inner = (
          <div>
            <h2 className={styles.title}>Approval status:</h2>

            {tier === 'Tier 1' && (
              <div className={styles.status}>
                <p>
                  <b>Selfie:</b> {selfie_document_status}
                </p>
              </div>
            )}

            {(tier === 'Tier 2' || tier === 'Tier 3') && (
              <div className={styles.status}>
                <p>
                  <b>Whitelist selfie:</b> {withdrawAddressStatus}
                </p>
              </div>
            )}
          </div>
        );

        if (selfie_document_status === 'REJECTED' || withdrawAddressStatus === 'REJECTED') {
          buttonText = 'Retry verification';
          modal = tier === 'Tier 1' ? KYCModalTier1 : KYCModalTier2;
          showInitial = true;
        }

        notificationsCtaVisible = true;
      }
    } else {
      title = (
        <div>
          <OrderStateLoader />
          <h2 className={styles.title}>Payment and verification received</h2>
        </div>
      );
      inner = <h3 className={styles.subtitle}>We will proceed to release your funds shortly</h3>;
    }

    return (
      <OrderPaymentTemplate
        title={title}
        notificationsCtaVisible={notificationsCtaVisible}
        buttonText={buttonText}
        modal={modal}
        showInitial={showInitial}
        {...this.props}
      >
        {inner}
      </OrderPaymentTemplate>
    );
  }
}

const mapStateToProps = ({ kyc }) => ({ kyc });
const mapDistachToProps = dispatch => bindActionCreators({ fetchKyc }, dispatch);

export default connect(
  mapStateToProps,
  mapDistachToProps
)(OrderPayment);
