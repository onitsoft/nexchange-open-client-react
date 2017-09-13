import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import config from '../config';


class Testimonials extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return (
			<div className="col-xs-12 col-sm-6">
					<div className="box testimonial">
						<img src={`${this.props.img}`} alt={`${this.props.name} profile`} className="img-circle img-responsive" />

						<div className="profile-info">
							<h4>{this.props.name}</h4>
						</div>

						<a href={this.props.link} target="_blank" className={`btn social-link ${this.props.network}`}><i className={`fa fa-${this.props.network}`}></i><span className="social-link-text">{this.props.network.toLowerCase()}</span></a>

						<div className="testimonial-text">{this.props.text}</div>

						<i className="publish-date">{this.props.date}</i>
					</div>
			</div>
		);
	}
}

export default Testimonials;
