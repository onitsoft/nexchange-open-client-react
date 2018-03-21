import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
<<<<<<< HEAD

=======
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
import Helpers from '../helpers';
import Box from '../components/Box';

class RefundAddress extends Component {
	constructor(props) {
		super();
		this.state = {
			value: '',
			message: {
				text: '',
<<<<<<< HEAD
				error: false
			},
			show: false
=======
				error: ''
			},
			disabled: true,
			userStatus: null,

>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios({
<<<<<<< HEAD
			method: 'get',
			contentType : 'application/json',
			url: `${config.API_BASE_URL}/users/me/`,
			data: {email: this.state.email},
			headers: {'Authorization': 'Bearer ' + localStorage.token}
		})
		.then(data => {
			console.log(data);

			// TODO: Remove 11 later. Only show on order status 12,13,14,15
			if (data.status === 200 &&
				[11,12,13,14,15].indexOf(this.props.order.status_name[0][0]) > -1)
			{
				this.setState({ show: true });
			}
		})
		.catch(error => {
			console.log(error);
		});
=======
            method: 'get',
            contentType : 'application/json',
            url: `${config.API_BASE_URL}/users/me/`,
            data: {email: this.state.email},
            headers: {'Authorization': 'Bearer ' + localStorage.token}
		})
			.then(data => {
				this.setState({ userStatus: data.status });
			})
			.catch(error => {
				console.log(error);
			});
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
	}

	handleChange(event) {
  		this.setState({value: event.target.value});

		if (event.target.value.length > 0) {
			Helpers.validateWalletAddress(event.target.value, this.props.order.pair.quote.code, () => {
				this.setState({
					message: {
						text: `${event.target.value} is not a valid ${this.props.order.pair.quote.code} address`,
<<<<<<< HEAD
						type: 'error'
=======
						error: 'error'
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
					}
				})
			}, () => {
				this.setState({
<<<<<<< HEAD
					message: {
						text: '',
						type: ''
=======
					disabled: false,
					message: {
						text: '',
						error: ''
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
					}
				})
			});
		} else {
			this.setState({
<<<<<<< HEAD
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
=======
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
				url: `${config.API_BASE_URL}/order/${this.props.order.unique_reference}/`,
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
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c

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

<<<<<<< HEAD
							<button type="submit" className="btn btn-themed btn-lg">Set refund address</button>
=======
							<button
								type="submit"
								className="btn btn-themed btn-lg"
								disabled={this.state.disabled}>
								Set refund address
							</button>
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
						</form>
					</div>
				</div>
			</Box>
		);
	}
}

export default RefundAddress;
