import React, { Component } from 'react';
import KYCModal from '../components/KYCModal';


class OrderPayment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showKYCModal: false
		}
	}

	render() {
		return (
			<div className="col-xs-12 text-center order-status-section">
				<h2 style={{margin: "0"}}>Payment received, waiting for verification</h2>

				<p style={{fontSize: "16px", marginTop: "15px"}}>In order to fulfill your order we must get to know you better by getting a copy of your government issued ID and proof of residence. If we do not get these documents within 2 hours, we will refund the order.</p>

				<button type="button" className="btn btn-default btn-themed" onClick={() => this.setState({showKYCModal: true})}>
					<i className="fa fa-credit-card" aria-hidden="true" style={{position: "relative", left: -13}}></i>
					Get verified
				</button>

				<KYCModal show={this.state.showKYCModal} onClose={() => this.setState({showKYCModal: false})} />
			</div>
		)
	}

};

export default OrderPayment;
