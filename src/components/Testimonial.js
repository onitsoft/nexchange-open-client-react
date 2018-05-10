import React from 'react';
import config from '../config';


const Testimonial = props => (
	<div className="col-xs-12 col-sm-6">
		<div className="box testimonial">
			<img src={`${props.img}`} alt={`${props.name} profile`} className="img-circle img-responsive" />

			<div className="profile-info">
				<h4>{props.name}</h4>
			</div>

			<a href={props.link} target="_blank" className={`btn social-link ${props.network}`}><i className={`fa fa-${props.network}`}></i><span className="social-link-text">{props.network.toLowerCase()}</span></a>

			<div className="testimonial-text">{props.text}</div>

			<i className="publish-date">{props.date}</i>
		</div>
	</div>
)

export default Testimonial;
