import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';

import KYCModal from './KYCModal';


class OrderPayment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showKYCModal: false,
			kyc: null
		}

		this.checkKYC = this.checkKYC.bind(this);
	}

	checkKYC() {
		axios.get(`${config.API_BASE_URL}/kyc/${this.props.match.params.orderRef}`)
		.then(response => {
			this.setState({kyc: response.data});

			console.log(response.data);
		})
		.catch(error => {
			console.log(error);
		});
	}

	componentDidMount() {
		this.checkKYC();
	}

	render() {
		let inner;
		let buttonText;
		if (!this.state.kyc)
			inner = <h2>Checking KYC status...</h2>;
		else if (!this.state.kyc.is_verified) {
			if (!this.state.kyc.id_document_status && !this.state.kyc.residence_document_status) {
				inner = (
					<div>
						<h2>Payment received, awaiting for verification</h2>

						<p className="explanation">In order to fulfill your order we must get to know you better by getting a copy of your government issued ID and proof of residence. If we do not get these documents within 2 hours, we will refund the order.</p>
					</div>
				);

				buttonText = "Get verified";
			} else {
				inner = (
					<div>
						<h2>Verification received, awaiting approval</h2>

						<p className="explanation">We have received your government issued ID and proof of residence documents. Our team is now verifying them, keep checking this page for further information.</p>

						<hr style={{marginLeft: -15, marginRight: -15}} />

						<h2>Approval status:</h2>
						<p style={{margin:0}}><b>Government issued ID:</b> {this.state.kyc.id_document_status}</p>
						<p><b>Proof of residence:</b> {this.state.kyc.residence_document_status}</p>
					</div>
				);

				if (this.state.kyc.id_document_status == 'REJECTED' && this.state.kyc.residence_document_status == 'REJECTED') {
					buttonText = "Retry to get verified";
				} else if (
					(this.state.kyc.id_document_status == 'APPROVED'
					|| this.state.kyc.id_document_status == 'PENDING')
					&& this.state.kyc.residence_document_status == 'REJECTED') {
					buttonText = "Reverify proof of residence";
				} else if (
					(this.state.kyc.residence_document_status == 'APPROVED'
					|| this.state.kyc.residence_document_status == 'PENDING')
					&& this.state.kyc.id_document_status == 'REJECTED') {
					buttonText = "Reverify government issued ID"
				}
			}
		} else if (this.state.kyc.id_document_status == 'APPROVED' && this.state.kyc.residence_document_status == 'APPROVED') {
			inner = (
				<div>
					<h2>Payment and verification received</h2>

					<p className="explanation">We have received your payment and our team has verified your identity and proof of residence documents. We will soon release your funds and send you the payment.</p>
				</div>
			);
		}

		return <div className="col-xs-12 text-center order-status-section">
			{inner}

			{buttonText ?
			<button type="button" className="btn btn-default btn-themed" onClick={() => this.setState({showKYCModal: true})}>
				<i className="fa fa-credit-card" aria-hidden="true" style={{position: "relative", left: -13}}></i>
				{buttonText}
			</button> : null}

			<KYCModal show={this.state.showKYCModal} onClose={() => this.setState({showKYCModal: false})} {...this.props} />
		</div>
	}

};

export default OrderPayment;
