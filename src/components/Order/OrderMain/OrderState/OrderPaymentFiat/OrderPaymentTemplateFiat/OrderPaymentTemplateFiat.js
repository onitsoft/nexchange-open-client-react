import React, { Component } from 'react';
import DesktopNotifications from './DesktopNotifications/DesktopNotifications';
import { I18n } from 'react-i18next';
import styles from '../../OrderState.scss';

class OrderPaymentTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { showKYCModal: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showKYCModal: this.props.showInitial });
    }, 5000);
  }

  render() {
    const KYCModal = this.props.modal;
    const { user_visible_comment, is_verified, out_of_limit } = this.props.kyc;

    return (
    <I18n ns="translations">
    {(t) => (
      <div className={styles.container}>
        {this.props.title}
        {this.props.children}
        {user_visible_comment &&
          (!is_verified || out_of_limit) && (
            <h3 className={styles.subtitle} style={{ marginBottom: 5 }}>
              <b>{t('order.fiat.status.reject')}:</b> {user_visible_comment}
            </h3>
          )}

        {this.props.buttonText && (
          <button
            type="button"
            className="btn btn-default btn-themed"
            onClick={() => this.setState({ showKYCModal: true })}
            style={{ marginTop: 20 }}
          >
            <i className="fas fa-credit-card" aria-hidden="true" style={{ position: 'relative', left: -13 }} />
            {this.props.buttonText}
          </button>
        )}

        <DesktopNotifications kyc={this.props.kyc} visible={this.props.notificationsCtaVisible} order={this.props.order} />

        {KYCModal && (
          <KYCModal
            show={this.state.showKYCModal}
            onClose={() => {
              this.setState({ showKYCModal: false });
              this.props.fetchKyc(this.props.order.unique_reference);
            }}
            showInitial={this.props.showInitial}
            kyc={this.props.kyc}
            {...this.props}
          />
        )}
      </div>
    )}
    </I18n>
    );
  }
}

export default OrderPaymentTemplate;
