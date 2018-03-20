import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import Box from '../components/Box';

class Notifications extends Component {
	constructor(props) {
		super();
		this.state = {
			email: '',
			message: {
				text: '',
				error: false
			}
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		axios({
            method: 'put',
            contentType : 'application/json',
            url: `${config.API_BASE_URL}/users/me/`,
            data: {email: this.state.email},
            headers: {'Authorization': 'Bearer ' + localStorage.token}
		})
			.then(data => {
				this.setState({
					message: {
						text: 'Success, you set your email.',
						error: false
					}
				});
			})
			.catch(error => {
				if (error.response.status === 401) {
					this.setState({
						message: {
							text: 'You do not have access to get notifications for this order.',
							error: true
						}
					});
				} else {
					this.setState({
						message: {
							text: 'Something went wrong. Try again later.',
							error: true
						}
					});
				}
			});
	}

	render() {
		// TODO: Should be [12,13,14,15], left 11 for testing purposes
		if ([11,12,13,14,15].indexOf(this.props.order.status_name[0][0]) === -1) {
			return null;
		}

		return (
			<Box id="notifications">
				<h2>Get notified about your order!</h2>
	
				<div className="row">
					<div className="col-xs-12 col-md-8 col-md-push-2">
						<form onSubmit={this.handleSubmit}>
							<h4 className={this.state.message.error ? 'text-danger' : 'text-green'}>
								{this.state.message.text}
							</h4>

							<div className="form-group">
								<input
									type="email"
									name="email" 
									placeholder="Email"
									className="form-control"
									onChange={this.handleInputChange}
									value={this.state.email}
									required
								/>
								<span className="material-input"></span>
							</div>

							{/*<div className="form-group">
								<input type="tel" name="tel" placeholder="Telephone (optional)" className="form-control" />
								<span className="material-input"></span>
							</div>*/}

							<button type="submit" className="btn btn-themed btn-lg">Receive notifications</button>
						</form>
					</div>
				</div>
		    </Box> 
		);
	}
}

export default Notifications;
