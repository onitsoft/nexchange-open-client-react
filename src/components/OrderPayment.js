import React, { Component } from 'react';
import {Icon} from 'react-fa';
import CopyToClipboard from 'react-copy-to-clipboard';

import OrderExpired from './OrderExpired';


class OrderPayment extends Component {
	constructor(props) {
		super(props);
	}

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

	render() {
		if (this.props.expired)
			return <OrderExpired />;

	    return (
	    	<div id="order-payment">
    			<div className="col-xs-12 col-sm-4 col-md-3">
    				<img src="https://chart.googleapis.com/chart?chs=250x250&chld=L|2&cht=qr&chl=bitcoin:1KTFHHwtdNmGrbY5MfWhtswpG9tuxZwwoA?amount=0.0363" />
    			</div>

    			<div id="order-payment-details" className="col-xs-12 col-sm-8 col-md-9">
    				<h3>Time remaining: <span id="time-remaining"><b>{this.props.timeRemaining}</b></span></h3>

    				<h4>Send <b>{this.props.depositAmount} {this.props.depositCoin}</b> to the address<br/>
    					<b id="deposit-address">{this.props.depositAddress}</b>
    				</h4>
    				
			        <CopyToClipboard text={this.props.depositAddress} onCopy={() => this.triggerCopyTooltip()}>
						<button id="copy-to-clipboard" type="button" className="btn btn-default">Copy the address</button>
    				</CopyToClipboard>
    			</div>
		    </div>
	    );
	}
}

export default OrderPayment;
