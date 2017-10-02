import React, { Component } from 'react';
import axios from 'axios';

import config from '../config';


class Notifications extends Component {
	constructor(props) {
		super();
		this.state = {
		};
	}

	componentDidMount() {
	}

	componentDidUpdate(prevProps) {
	}

	componentWillUnmount() {
	}

	render() {
		return (
		    <div id="notifications" className="col-xs-12">
		    	<div className="box">
		    		<div className="row">
		    			<div className="col-xs-12">
							<h2>Get notified about your order!</h2>
							<h4>Provide email/phone and whenever order status updates, we will let you know</h4>

							<div className="col-xs-12 col-sm-8 col-sm-push-2">
								<div className="form-group is-empty has-success">
									<input type="email" name="email" placeholder="Email" className="form-control" required />
								<span className="material-input"></span></div>

								<div className="form-group is-empty has-success">
									<input type="phone" name="phone" placeholder="Email" className="form-control" required />
								<span className="material-input"></span></div>
							</div>
		    			</div>
		    		</div>
		    	</div>
		    </div> 
		);
	}
}

export default Notifications;
