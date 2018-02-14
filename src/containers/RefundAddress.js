import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert } from '../actions';


class RefundAddress extends Component {
	constructor(props) {
		super();
		this.state = {

		};
	}

	render() {
		return (
			<div id="share-referral" className="col-xs-12">
				<div className="box">
					<div className="row">
						<div className="col-xs-12">
							<h2>Refund address</h2>
							<h4></h4>

							<div className="row">
								<div className="col-xs-12 col-md-8 col-md-push-2">
									<form>
										<div className="form-group">
											<input type="refund-address" name="refund-address" placeholder="Refund address" className="form-control" required />
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



function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		errorAlert: errorAlert,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(RefundAddress);
