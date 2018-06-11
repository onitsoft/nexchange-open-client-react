import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import i18n from '../../i18n';
import { I18n } from 'react-i18next';

class OrderInitial extends Component {
  triggerCopyTooltip() {
    $('#copy-to-clipboard').tooltip({
      trigger: 'click',
      placement: 'top',
    });

    $('#copy-to-clipboard')
      .tooltip('hide')
      .attr('data-original-title', i18n.t('order.copy'))
      .tooltip('show');

    setTimeout(() => {
      $('#copy-to-clipboard').tooltip('destroy');
    }, 1000);
  }

  getDepositAddressQr() {
    return `https://chart.googleapis.com/chart?chs=250x250&chld=L|2&cht=qr&chl=
			${this.props.order.deposit_address.address}`;
  }

  render() {
    return (
     <I18n ns="translations">
      {(t) => (
      <div id="order-payment" className="row">
        <div className="col-xs-12 col-ms-4 col-sm-4 col-md-3">
          <img src={this.getDepositAddressQr()} alt={t('order.qr')} />
        </div>

        <div id="order-payment-details" className="col-xs-12 col-ms-8 col-sm-8 col-md-9">
          <h3>
            {t('order.initial1')}:{' '}
            <span id="time-remaining">
              <b>{this.props.time}</b>
            </span>
          </h3>

          <h4>
            {t('order.initial2')}{' '}
            <b>
              {this.props.order.amount_quote} {this.props.order.pair.quote.code}
            </b>{' '}
            {t('order.initial3')}<br />
            <b id="deposit-address" style={{ wordWrap: 'break-word' }}>
              {this.props.order.deposit_address.address}
            </b>
          </h4>

          <CopyToClipboard text={this.props.order.deposit_address.address} onCopy={() => this.triggerCopyTooltip()}>
            <button id="copy-to-clipboard" type="button" className="btn btn-default btn-themed">
              {t('order.initial4')}
            </button>
          </CopyToClipboard>
        </div>
      </div>
      )}
     </I18n>
    );
  }
}

export default OrderInitial;
