import React, { Component } from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import _ from 'lodash';


class OrderInitial extends Component {
	triggerCopyTooltip() {
		$('#copy-to-clipboard').tooltip({
			trigger: 'click',
			placement: 'top'
		});

		$('#copy-to-clipboard').tooltip('hide')
			.attr('data-original-title', 'Wallet address copied!')
			.tooltip('show');

		setTimeout(() => {
			$('#copy-to-clipboard').tooltip('destroy');
		}, 1000);
	}

	getDepositAddressQr () {
		return `https://chart.googleapis.com/chart?chs=250x250&chld=L|2&cht=qr&chl=
			${this.props.order.deposit_address.address}`;
	}

	render() {
	    return (
	    	<div id="order-payment">
    			<div className="col-xs-12 col-ms-4 col-sm-4 col-md-3">
    				<img src={this.getDepositAddressQr()} />
    			</div>

    			<div id="order-payment-details" className="col-xs-12 col-ms-8 col-sm-8 col-md-9">
    				<h3>Time remaining: <span id="time-remaining"><b>{this.props.timeRemaining}</b></span></h3>

    				<h4>Send <b>{this.props.order.amount_quote} {this.props.order.pair.quote.code}</b> to the address<br/>
    					<b id="deposit-address">{this.props.order.deposit_address.address}</b>
    				</h4>

			        <CopyToClipboard text={this.props.order.deposit_address.address} onCopy={() => this.triggerCopyTooltip()}>
						<button id="copy-to-clipboard" type="button" className="btn btn-default btn-themed">Copy the address</button>
    				</CopyToClipboard>
    			</div>
		    </div>
	    );
	}
}


function mapStateToProps(state) {
	return {
		coinsInfo: state.coinsInfo
	}
}

export default connect(mapStateToProps)(OrderInitial);
