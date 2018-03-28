import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
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
			},
			disabled: true,
			userStatus: null,

		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios
			.get(`${config.API_BASE_URL}/users/me/`, { email: this.state.email })
			.then(data => {
				this.setState({ userStatus: data.status });
			})
			.catch(error => {
				console.log(error);
			});
	}

	handleChange(event) {
		const address = event.target.value.replace(new RegExp(/ /g, 'g'), '');
  		this.setState({value: address});

		if (address.length > 0) {
			Helpers.validateWalletAddress(address, this.props.order.pair.quote.code, () => {
				this.setState({
					message: {
						text: `${address} is not a valid ${this.props.order.pair.quote.code} address`,
						error: 'error'
					}
				})
			}, () => {
				this.setState({
					disabled: false,
					message: {
						text: '',
						error: ''
					}
				})
			});
		} else {
			this.setState({
				disabled: true,
				message: {
					text: '',
					error: ''
				}
			})
		}
  	}

	handleSubmit(event) {
		event.preventDefault();
		
		axios({
				method: 'put',
				contentType : 'application/json',
				url: `${config.API_BASE_URL}/orders/${this.props.order.unique_reference}/`,
				data: { refund_address: this.state.value },
				headers: {'Authorization': 'Bearer ' + localStorage.token}
			})
			.then(data => {
				this.setState({
					message: {
						text: 'Success, you set a refund address.',
						error: false
					}
				});
			})
			.catch(error => {
				this.setState({
					message: {
						text: 'Something went wrong. Try again later.',
						error: true
					}
				});
			});
  	}

	render() {
		// TODO: Should be [12,13,14,15], left 11 for testing purposes
		if ([11,12,13,14,15].indexOf(this.props.order.status_name[0][0]) === -1
			|| this.state.userStatus !== 200) {
			return null;
		}

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

							<button
								type="submit"
								className="btn btn-themed btn-lg"
								disabled={this.state.disabled}>
								Set refund address
							</button>
						</form>
					</div>
				</div>
			</Box>
		);
	}
}

export default RefundAddress;
