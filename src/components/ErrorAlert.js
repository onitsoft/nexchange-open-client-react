import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-fa';

import FAQ from './FAQ';
import Support from './Support';

import '../css/components/Header.scss';


class ErrorAlert extends Component {
	constructor(props) {
		super();

		this.state = {
			show: false,
			message: null
		}
	}

	componentWillUpdate(newProps) {
		if (this.state.message != newProps.data.message)
			this.setState(newProps.data)
	}

	render() {
		if (!this.state.show) return null;

	    return (
			<div className="alert alert-warning">
				 <div className="container-fluid">
					 <div className="alert-icon">
						<i className="material-icons">error_outline</i>
					</div>
					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true"><i className="material-icons">clear</i></span>
					</button>
				     <b>Error Alert:</b> {this.state.message}
				</div>
			</div>
	    );
	}
}

export default ErrorAlert;
