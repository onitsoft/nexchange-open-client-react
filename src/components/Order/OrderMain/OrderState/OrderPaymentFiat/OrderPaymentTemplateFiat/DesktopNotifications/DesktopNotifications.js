import React, { Component } from 'react';
import Notify from 'notifyjs';
import i18n from '../i18n';
import equals from 'deep-equal';
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.kyc && !equals(this.props.kyc, nextProps.kyc)) {
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
      <I18n ns="translations">
      {(t) => (
      <div className="row">
        <div className="col-xs-12 text-center">
          <a href="javascript:void(0)" className={styles.title} onClick={this.onClick}>
            <h4>{t('order.kycstatuscheck')}</h4>
          </a>
        </div>
      </div>
      )}
      </I18n>
);
  }
}

export default DesktopNotifications;
