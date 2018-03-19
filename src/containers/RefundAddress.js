import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import Helpers from '../helpers';


class RefundAddress extends Component {
	constructor(props) {
		super();
		this.state = {
			value: '',
			message: {
				text: '',
				type: ''
			},
			show: true
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
    	event.preventDefault();
  	}

	render() {
		if (this.state.show === false) return null;

		return (
			<div id="share-referral" className="col-xs-12">
				<div className="box">
					<div className="row">
						<div className="col-xs-12">
							<h2>Refund address</h2>

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


export default RefundAddress;
