import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import config from '../config';
import Testimonial from './Testimonial.js';


class Testimonials extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return (
			<div id="testimonials">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<h2>Testimonials</h2>
						</div>
					</div>

					<div className="row">
						<Testimonial />
						<Testimonial />
						<Testimonial />
						<Testimonial />
					</div>
				</div>
			</div>
		);
	}
}

export default Testimonials;
