import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import Box from '../components/Box';
>>>>>>> Use containment to reduce some bloat on order components.
=======
import Box from '../components/Box';
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c

class Notifications extends Component {
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

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios({
				method: 'get',
				contentType : 'application/json',
				url: `${config.API_BASE_URL}/users/me/orders/${this.props.order.unique_reference}`,
				headers: {'Authorization': 'Bearer ' + localStorage.token}
			})
			.then(data => {
				this.setState({ show: true });
			})
			.catch(error => {
				this.setState({ show: false });
			});
	}

	handleChange(event) {
		this.setState({
		  value: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		axios({
				method: 'put',
				contentType : 'application/json',
				url: `${config.API_BASE_URL}/users/me/`,
				data: {email: this.state.value},
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
<<<<<<< HEAD
		if (this.state.show === false) {
=======
		// TODO: Should be [12,13,14,15], left 11 for testing purposes
		if ([11,12,13,14,15].indexOf(this.props.order.status_name[0][0]) === -1) {
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
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

<<<<<<< HEAD
<<<<<<< HEAD
										<div className="form-group">
											<input
												type="email"
												name="email" 
												placeholder="Email"
												className="form-control"
												onChange={this.handleChange}
												value={this.state.value}
												required
											/>
											<span className="material-input"></span>
										</div>

										<button type="submit" className="btn btn-themed btn-lg">Receive notifications</button>
									</form>
								</div>
							</div>
		    			</div>
		    		</div>
		    	</div>
		    </div> 
=======
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

=======
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

>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
							{/*<div className="form-group">
								<input type="tel" name="tel" placeholder="Telephone (optional)" className="form-control" />
								<span className="material-input"></span>
							</div>*/}

							<button type="submit" className="btn btn-themed btn-lg">Receive notifications</button>
						</form>
					</div>
				</div>
		    </Box> 
<<<<<<< HEAD
>>>>>>> Use containment to reduce some bloat on order components.
=======
>>>>>>> c6197f7867b8170a2b2fe05faaf575f42f11ec8c
		);
	}
}

export default Notifications;
