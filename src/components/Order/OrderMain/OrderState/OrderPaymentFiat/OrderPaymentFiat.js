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
import i18n from '../../../../../i18n';
import { I18n } from 'react-i18next';
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
        <I18n ns="translations">
        {(t) => (
        <div className="text-center order-status-section">
          <h2>{t('order.fiat.kyc.statustitle')}...</h2>
        </div>
        )}
        </I18n>
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
        title = <h2 className={styles.title}>{i18n.t('order.fiat.status.2')}</h2>;
        inner = (
          <div>
            <h3 className={styles.subtitle}>
              {i18n.t('order.fiat.status.2')}
            </h3>

            <h3 className={styles.subtitle}>
              <b>
                {i18n.t('order.fiat.status.7')}
              </b>
            </h3>
          </div>
        );

        modal = KYCModalTier0;
        buttonText = i18n.t('order.fiat.kyc.3');
        showInitial = true;
      } else {
        title = (
          <div>
            <OrderStateLoader />
            <h2 className={styles.title}>{i18n.t('order.fiat.status.3')}</h2>
          </div>
        );
        inner = (
          <div>
            <h2 className={styles.title}>Approval status:</h2>
            <div className={styles.status}>
              <p>
                <b>{i18n.t('order.fiat.kyc.1')}:</b> {id_document_status}
              </p>
              {/*
              <p>
                <b>{i18n.t('order.fiat.kyc.2')}:</b> {residence_document_status}
              </p>
              */}
            </div>
          </div>
        );

        notificationsCtaVisible = true;
        modal = KYCModalTier0;

        if (id_document_status === 'REJECTED' || residence_document_status === 'REJECTED') {
          buttonText = i18n.t('order.fiat.kyc.retry');
          showInitial = true;
        }
      }
    } else if (this.props.kyc.out_of_limit) {
      title = <h2 className={styles.title}>{i18n.t('order.fiat.tier.limit')}</h2>;

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
                {i18n.t('order.fiat.tier.explanation')}
              </b>
            </h3>
          </div>
        );

        modal = tier === 'Tier 1' ? KYCModalTier1 : KYCModalTier2;
        buttonText = i18n.t('order.fiat.kyc.3');
        showInitial = true;
      } else if (tier === 'Tier 3' && (withdrawAddressStatus !== 'PENDING' && withdrawAddressStatus !== 'REJECTED')) {
        inner = (
          <div>
            <h3 className={styles.subtitle}>
              <b>
                {i18n.t('order.fiat.tier.explanation2')}
              </b>
            </h3>
          </div>
        );

        modal = KYCModalTier2;
        buttonText = i18n.t('order.fiat.kyc.3');
        showInitial = true;
      } else {
        title = (
          <div>
            <OrderStateLoader />
            <h2 className={styles.title}>{i18n.t('order.fiat.status.3')}</h2>
          </div>
        );
        inner = (
          <div>
            <h2 className={styles.title}>{i18n.t('order.fiat.status.5')}:</h2>

            {tier === 'Tier 1' && (
              <div className={styles.status}>
                <p>
                  <b>{i18n.t('order.fiat.tier.selfie')}:</b> {selfie_document_status}
                </p>
              </div>
            )}

            {(tier === 'Tier 2' || tier === 'Tier 3') && (
              <div className={styles.status}>
                <p>
                  <b>{i18n.t('order.fiat.tier.w_selfie')}:</b> {withdrawAddressStatus}
                </p>
              </div>
            )}
          </div>
        );

        if (selfie_document_status === 'REJECTED' || withdrawAddressStatus === 'REJECTED') {
          buttonText = i18n.t('order.fiat.kyc.retry');
          modal = tier === 'Tier 1' ? KYCModalTier1 : KYCModalTier2;
          showInitial = true;
        }

        notificationsCtaVisible = true;
      }
    } else {
      title = (
        <div>
          <OrderStateLoader />
          <h2 className={styles.title}>{i18n.t('order.fiat.status.paid')}</h2>
        </div>
      );
      inner = <h3 className={styles.subtitle}>{i18n.t('order.fiat.status.success')}</h3>;
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
