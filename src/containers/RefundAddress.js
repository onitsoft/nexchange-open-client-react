import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert } from '../actions';

import Helpers from '../helpers';


class RefundAddress extends Component {
	constructor(props) {
		super();
		this.state = {
			value: '',
			message: {
				text: '',
				type: ''
			}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
  	this.setState({value: event.target.value});

		if (event.target.value.length > 0) {
			Helpers.validateWalletAddress(event.target.value, this.props.order.pair.quote.code, () => {
				this.setState({
					message: {
						text: `${event.target.value} is not a valid ${this.props.order.pair.quote.code} address`,
						type: 'error'
					}
				})
			}, () => {
				this.setState({
					message: {
						text: '',
						type: ''
					}
				})
			});
		} else {
			this.setState({
				message: {
					text: '',
					type: ''
				}
			})
		}
  }

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

	render() {
		return (
			<div id="share-referral" className="col-xs-12">
				<div className="box">
					<div className="row">
						<div className="col-xs-12">
							<h2>Refund address</h2>
							<h4></h4>

							<div className="row">
								<div className="col-xs-12 col-md-8 col-md-push-2">
									<form onSubmit={this.handleSubmit}>
										<div className="form-group" style={{marginTop: 0}}>
											<label className={`${this.state.message.type}`}>{this.state.message.text}</label>

											<input type="text"
												name="refund-address"
												placeholder="Refund address"
												className="form-control"
												value={this.state.value}
												onChange={this.handleChange}
												required />
										</div>

										<button type="submit" className="btn btn-themed btn-lg">Set refund address</button>
									</form>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}



function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		errorAlert: errorAlert,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(RefundAddress);
