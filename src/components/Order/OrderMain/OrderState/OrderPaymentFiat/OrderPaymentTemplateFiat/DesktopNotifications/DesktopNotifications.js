import React, { Component } from 'react';
import Notify from 'notifyjs';
import equals from 'shallow-equals';
import i18n from '../../../../../../../i18n';
import { I18n } from 'react-i18next';
import styles from './DesktopNotifications.scss';

class DesktopNotifications extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.notify = this.notify.bind(this);
  }

  notify(nextProps) {
    new Notify(`${i18n.t('notify.kycupdate')} #${this.props.order.unique_reference}`, {
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
        window.gtag('event', 'Track', {event_category: 'Order', event_label: `${this.props.order.unique_reference}`});
      });
    }
  }

  render() {
    if (!Notify.needsPermission || !this.props.kyc || !this.props.visible) {
      return null;
    }

    return (
      <I18n ns="translations">
      {(t) => (
      <div className="row">
        <div className="col-xs-12 text-center">
          <a href="javascript:void(0)" className={styles.title} onClick={this.onClick}>
            <h4>{t('order.fiat.kyc.statuscheck')}</h4>
          </a>
        </div>
      </div>
      )}
      </I18n>
    );
  }
}

export default DesktopNotifications;
