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
		if (!this.state.kyc)
			inner = <h2>Checking KYC status...</h2>;
		else if (!this.state.kyc.is_verified) {
			if (!this.state.kyc.id_document_status && !this.state.kyc.residence_document_status) {
				inner = (
					<div>
						<h2>Payment received, awaiting for verification</h2>

						<p className="explanation">In order to fulfill your order we must get to know you better by getting a copy of your government issued ID and proof of residence. If we do not get these documents within 2 hours, we will refund the order.</p>

						<button type="button" className="btn btn-default btn-themed" onClick={() => this.setState({showKYCModal: true})}>
							<i className="fa fa-credit-card" aria-hidden="true" style={{position: "relative", left: -13}}></i>
							Get verified
						</button>
					</div>
				);
			} else if (this.state.kyc.id_document_status == 'PENDING' && this.state.kyc.residence_document_status == 'PENDING') {
				inner = (
					<div>
						<h2>Verification received, awaiting approval</h2>

						<p className="explanation">We have received your government issued ID and proof of residence documents. Our team is now verifying them, keep checking this page for further information.</p>
					</div>
				);
			}
		}

		return <div className="col-xs-12 text-center order-status-section">
			{inner}
			<KYCModal show={this.state.showKYCModal} onClose={() => this.setState({showKYCModal: false})} {...this.props} />
		</div>
	}

};

export default OrderPayment;
