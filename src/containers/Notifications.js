import React, { Component } from 'react';
import axios from 'axios';

import config from '../config';


class Notifications extends Component {
	constructor(props) {
		super();
		this.state = {
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

	handleSubmit() {
		
	}

	render() {
		return (
		    <div id="notifications" className="col-xs-12">
		    	<div className="box">
		    		<div className="row">
		    			<div className="col-xs-12">
							<h2>Get notified about your order!</h2>

							<div className="row">
								<div className="col-xs-12 col-md-8 col-md-push-2">
									<form onSubmit={this.handleSubmit}>
										<div className="form-group">
											<input type="email" name="email" placeholder="Email" className="form-control" required />
										<span className="material-input"></span></div>

										<div className="form-group">
											<input type="tel" name="tel" placeholder="Telephone (optional)" className="form-control" />
										<span className="material-input"></span></div>

										<button type="submit" className="btn btn-themed btn-lg">Receive notifications</button>
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

export default Notifications;
