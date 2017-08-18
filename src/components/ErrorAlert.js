import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'react-fa';

import FAQ from './FAQ';
import Support from './Support';

import '../css/components/Header.scss';


class ErrorAlert extends Component {
	render() {
		if (!this.props.error.show) return null;

	    return (
			<div className="alert alert-warning">
				 <div className="container-fluid">
					 <div className="alert-icon">
						<i className="material-icons">error_outline</i>
					</div>
					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true"><i className="material-icons">clear</i></span>
					</button>
				     <b>Error Alert:</b> {this.props.error.message}
				</div>
			</div>
	    );
	}
}


function mapStateToProps(state) {
	return {
		error: state.error
	}
}

export default connect(mapStateToProps)(ErrorAlert);