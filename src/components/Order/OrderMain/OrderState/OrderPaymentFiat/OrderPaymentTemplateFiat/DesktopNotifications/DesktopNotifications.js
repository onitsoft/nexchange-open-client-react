import React, { Component } from 'react';
import Notify from 'notifyjs';
import equals from 'shallow-equals';
import styles from './DesktopNotifications.scss';

class DesktopNotifications extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.notify = this.notify.bind(this);
  }

  notify(nextProps) {
    new Notify(`KYC status updated for order #${this.props.order.unique_reference}`, {
      closeOnClick: true,
      notifyClick: function() {
        window.focus();
        this.close();
      },
    }).show();
  }

  kycEquals(currentKyc, nextKyc) {
    if (
      equals(currentKyc.id_document_status, nextKyc.id_document_status) &&
      equals(currentKyc.is_verified, nextKyc.is_verified) &&
      equals(currentKyc.residence_document_status, nextKyc.residence_document_status) &&
      equals(currentKyc.selfie_document_status, nextKyc.selfie_document_status) &&
      equals(currentKyc.user_visible_comment, nextKyc.user_visible_comment) &&
      equals(currentKyc.util_document_status, nextKyc.util_document_status) &&
      equals(currentKyc.whitelist_selfie_document_status, nextKyc.whitelist_selfie_document_status)
    ) {
      return true;
    }

    return false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.kyc && !this.kycEquals(this.props.kyc, nextProps.kyc)) {
      this.notify(nextProps);
    }
  }

  onClick() {
    if (Notify.isSupported()) {
      Notify.requestPermission(() => {
        window.ga('send', 'event', 'Order', 'track', this.props.order.unique_reference);
      });
    }
  }

  render() {
    if (!Notify.needsPermission || !this.props.kyc || !this.props.visible) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <a href="javascript:void(0)" className={styles.title} onClick={this.onClick}>
            <h4>Click here to get notified about your KYC status change</h4>
          </a>
        </div>
      </div>
    );
  }
}

export default DesktopNotifications;
