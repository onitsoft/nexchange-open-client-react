import React, { Component } from 'react';
import Helpers from '../helpers';
import Box from '../components/Box';

class RefundAddress extends Component {
	constructor(props) {
		super();
		this.state = {
			value: '',
			message: {
				text: '',
				error: ''
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
						error: 'error'
					}
				})
			}, () => {
				this.setState({
					message: {
						text: '',
						error: ''
					}
				})
			});
		} else {
			this.setState({
				message: {
					text: '',
					error: ''
				}
			})
		}
  }

	handleSubmit(event) {
    	event.preventDefault();
  	}

	render() {
		if (this.props.order)

		return (
			<Box id="refund-box">
				<h2>Refund address</h2>

				<div className="row">
					<div className="col-xs-12 col-md-8 col-md-push-2">
						<form onSubmit={this.handleSubmit}>
							<h4 className={this.state.message.error ? 'text-danger' : 'text-green'}>
								{this.state.message.text}
							</h4>

							<div className="form-group">
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
			</Box>
		);
	}
}

//if (this.props.order.status_name[0][0] > 11 && this.state.userStatus === 200) {
	// refundAddress = < order={this.props.order} />;
//}

export default RefundAddress;
