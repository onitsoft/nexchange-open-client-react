import React, { Component } from 'react';
import {Icon} from 'react-fa';


class OrderExpired extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
	}

	render() {
	    return (
			<div className="text-center">
			    <h2 style={{margin: "0"}}>Order Expired</h2>
			    <h5>Your order is expired. You can make a new exchange order.</h5>

			    <h4 style={{margin: "25px 0 5px", "fontWeight": "500"}} className="text-warning" data-toggle="tooltip" data-placement="top" title="" data-original-title="If you have already sent your coins, don’t worry. Once we get them, the status of the order will be updated retroactively.">Already sent?</h4>
			</div>
	    );
	}
}

export default OrderExpired;
