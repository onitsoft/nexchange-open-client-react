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
    			<div id="order-payment-details" className="col-xs-12 col-ms-6 col-sm-6 col-md-4">
    				<h3>Time remaining: <span id="time-remaining"><b>{this.props.timeRemaining}</b></span></h3>
    				<h4>Pay <b>{parseFloat(this.props.order.amount_quote)} {this.props.order.pair.quote.code}</b> <br />
    					Fee amounts to <b>{parseFloat(this.props.order.amount_quote_fee).toFixed(2)} {this.props.order.pair.quote.code}</b>
    				</h4>

					<a href={this.props.order.payment_url} target="_blank" className="btn btn-default btn-themed">
						<i className="fa fa-credit-card" aria-hidden="true" style={{position: "relative", left: -13}}></i>
						Pay now
					</a>
    			</div>

    			<div id="cards" className="col-xs-12 col-ms-6 col-sm-6 col-md-8">
    				<h3>Accepted cards:</h3>

    				<div className="visible-xs-block visible-sm-block">
    					<img src="/img/cards2.png" />
    				</div>

    				<div className="visible-md-block visible-lg-block">
    					<img src="/img/cards3.png" />
    				</div>
    			</div>
		    </div>
	    );
	}
}

export default OrderInitial;
