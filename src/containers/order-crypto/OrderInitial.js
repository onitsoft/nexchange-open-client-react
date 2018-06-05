import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class OrderInitial extends Component {
  triggerCopyTooltip() {
    $('#copy-to-clipboard').tooltip({
      trigger: 'click',
      placement: 'top',
    });

    $('#copy-to-clipboard')
      .tooltip('hide')
      .attr('data-original-title', 'Wallet address copied!')
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
      <div id="order-payment" className="row">
        <div className="col-xs-12">
          <img id="qr-code" src={this.getDepositAddressQr()} alt="Deposit QR code" />

          <div id="order-payment-details">
            <h3>
              Time remaining: <span id="time-remaining">{this.props.time}</span>
            </h3>

            <h4>
              Send{' '}
              <b>
                {this.props.order.amount_quote} {this.props.order.pair.quote.code}
              </b>{' '}
              to the address<br />
              <b id="deposit-address" style={{ wordWrap: 'break-word' }}>
                {this.props.order.deposit_address.address}
              </b>
            </h4>

            <CopyToClipboard text={this.props.order.deposit_address.address} onCopy={() => this.triggerCopyTooltip()}>
              <button id="copy-to-clipboard" type="button" className="btn btn-primary">
                Copy address
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderInitial;
