import React, { Component } from 'react';
import IL from '../img/flags/IL.svg';
import LT from '../img/flags/LT.svg';


class TeamMember extends Component {
	render() {
		console.log(this.props.social);

		let social = [];
		for (const key of Object.keys(this.props.social)) {
		    social.push(
		    	<a href={this.props.social[key]} key={key} target="_blank"><i className={key == 'medium' ? `fa fa-${key}` : `fa fa-${key}-square`} aria-hidden="true"></i></a>
		    );
		}

	    return (
			<div className="col-xs-12 col-ms-6 col-md-4 text-center">
				<div className="team-member">
					<img src={`/img/team/${this.props.id}.jpg`} className="img-circle img-responsive" />

					<h3>{this.props.name} <img src={`/img/flags/${this.props.country}.svg`} className="flag" /></h3>
					<h4>{this.props.title}</h4>

					<div className="social">
						{social}
					</div>

					<p>{this.props.description}</p>
				</div>
			</div>
	    );
	}
}

export default TeamMember;
