import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';


class RefundAddress extends Component {
	constructor(props) {
		super();
		this.state = {
			value: '',
			message: {
				text: '',
				error: false
			},
			show: false
		};

		console.log(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

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

	handleChange(event) {
		this.setState({ value: event.target.value });
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
									<form>
										<div className="form-group">
											<input
												type="refund-address"
												name="refund-address"
												placeholder="Refund address"
												className="form-control"
												onChange={this.handleChange}
												required />
											<span className="material-input"></span>
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
