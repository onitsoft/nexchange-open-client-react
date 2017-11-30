import React, { Component } from 'react';
import {Icon} from 'react-fa';
import CopyToClipboard from 'react-copy-to-clipboard';


class OrderInitial extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	    return (
	    	<div id="order-payment">
    			<div className="col-xs-12 col-ms-6 col-sm-5 col-md-4 text-center">
    				<img src="/img/cards.jpg" />
    			</div>

    			<div id="order-payment-details" className="col-xs-12 col-ms-6 col-sm-7 col-md-8">
    				<h3>Time remaining: <span id="time-remaining"><b>{this.props.timeRemaining}</b></span></h3>
    				<h4>Pay <b>{parseFloat(this.props.order.amount_quote)} {this.props.order.pair.quote.code}</b></h4>

					<a href={this.props.order.payment_url} target="_blank" className="btn btn-default btn-themed">
						<i className="fa fa-credit-card" aria-hidden="true" style={{position: "relative", left: -13}}></i>
						Pay now
					</a>
    			</div>
		    </div>
	    );
	}
}

export default OrderInitial;
