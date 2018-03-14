import React from 'react';
import { connect } from 'react-redux';
import Sticky from 'react-stickynode';


const ErrorAlert = (props) => {
	return (
		<Sticky enabled={true} top={0} bottomBoundary={1200}>
			<div className={props.error.show ? "alert alert-warning" : "alert alert-warning hidden"}>
				 <div className="container">
					<div className="alert-icon">
						<i className="material-icons">error_outline</i>
					</div>
					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true"><i className="material-icons">clear</i></span>
					</button>

				  <b>Warning:</b> {props.error.message}
				</div>
			</div>
		</Sticky>
	);
};


function mapStateToProps(state) {
	return {
		error: state.error
	}
}

export default connect(mapStateToProps)(ErrorAlert);
