import React, { Component } from 'react';


class OrderPayment extends Component {
	constructor(props) {
		super(props);

		this.coin = props.order.pair.quote;
	}

	render() {
		return (
			<div className="col-xs-12 text-center order-status-section">
				<h2 style={{margin: "0"}}>Transaction detected</h2>
			</div>
		)
	}

};

export default OrderPayment;
