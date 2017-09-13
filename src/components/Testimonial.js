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
						<img src="/img/testimonials/cryptotalk.jpg" alt="Crypto Talk profile" className="img-circle img-responsive" />

						<div className="profile-info">
							<h4>Crypto Talk‏</h4>
							<small><a href="https://twitter.com/bitreff" target="_blank">@bitreff</a></small>
						</div>

						<a href="https://twitter.com/bitreff/status/907478815890325504" target="_blank" className="btn social-link"><i className="fa fa-twitter"></i><span className="social-link-text">Twitter</span></a>

						<div className="testimonial-text">
							Check Out @NexchangeIO with a Simple, Secure and a transparent exchange that you use without registration.
						</div>

						<i className="publish-date">
							September 11, 2017, 10:39 PM
						</i>
					</div>
			</div>
		);
	}
}

export default Testimonials;
