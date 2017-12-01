import React, { Component } from 'react';
import helpers from '../../helpers';
import config from '../../config';
import _ from 'lodash';


class OrderPaid extends Component {
	constructor(props) {
		super(props);

		this.coin = this.props.order.pair.quote;
	}

	render() {
		return (
			<div id="order-paid" className="col-xs-12 text-center">
				<h2 style={{margin: "0"}}>Payment & verification received</h2>
				<h5>We are now preparing to release your coins</h5>
			</div> 
		)
	}

};

export default OrderPaid;
