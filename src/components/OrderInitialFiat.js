import React, { Component } from 'react';
import {Icon} from 'react-fa';
import CopyToClipboard from 'react-copy-to-clipboard';

import CreditCardModal from './CreditCardModal';
import KYCModal from './KYCModal';


class OrderInitial extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showCreditCardModal: true,
			showKYCModal: false
		}

		this.successfulPayment = this.successfulPayment.bind(this);
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

	successfulPayment() {
		this.setState({showCreditCardModal: false, showKYCModal: true});
	}

	render() {
	    return (
	    	<div id="order-payment">
    			<div className="col-xs-12 col-sm-4 col-md-3">
    				<img src="" />
    			</div>

    			<div id="order-payment-details" className="col-xs-12 col-sm-8 col-md-9">
    				<h3>Time remaining: <span id="time-remaining"><b>{this.props.timeRemaining}</b></span></h3>

    				<h4>Pay <b>{this.props.depositAmount} {this.props.depositCoin}</b></h4>

					<a href={this.props.order.payment_url} target="_blank" className="btn btn-default btn-themed">
						<i className="fa fa-credit-card" aria-hidden="true" style={{position: "relative", left: -13}}></i>
						Pay now
					</a>
    			</div>

			    <KYCModal show={this.state.showKYCModal} onClose={() => this.setState({showKYCModal: false})} />
		    </div>
	    );
	}
}

export default OrderInitial;
