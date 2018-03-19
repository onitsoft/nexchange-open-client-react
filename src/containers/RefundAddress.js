import React, { Component } from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert } from '../actions';

import Helpers from '../helpers';
=======
import axios from 'axios';
import config from '../config';
>>>>>>> Show refund box only on order status > 11 and if user is authorized.

import Helpers from '../helpers';


class RefundAddress extends Component {
	constructor(props) {
		super();
		this.state = {
			value: '',
			message: {
				text: '',
<<<<<<< HEAD
<<<<<<< HEAD
				type: ''
			}
		};

=======
				error: false
			},
			show: false
		};

		console.log(props);

>>>>>>> Show refund box only on order status > 11 and if user is authorized.
=======
				type: ''
			},
			show: true
		};

>>>>>>> rebase in progress; onto bc2cb08
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
	componentDidMount() {
		axios({
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
	}

=======
>>>>>>> rebase in progress; onto bc2cb08
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

>>>>>>> Show refund box only on order status > 11 and if user is authorized.
		return (
			<div id="share-referral" className="col-xs-12">
				<div className="box">
					<div className="row">
						<div className="col-xs-12">
							<h2>Refund address</h2>
<<<<<<< HEAD
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
=======

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
<<<<<<< HEAD
											<span className="material-input"></span>
>>>>>>> Show refund box only on order status > 11 and if user is authorized.
=======
>>>>>>> rebase in progress; onto bc2cb08
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


<<<<<<< HEAD

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		errorAlert: errorAlert,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(RefundAddress);
=======
export default RefundAddress;
>>>>>>> Show refund box only on order status > 11 and if user is authorized.
