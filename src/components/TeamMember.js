import React, { Component } from 'react';


class TeamMember extends Component {
	render() {
		let social = [];
		for (const key of Object.keys(this.props.social)) {
		    social.push(
		    	<a href={this.props.social[key]} key={key} target="_blank"><i className={key == 'medium' || key == 'quora' ? `fa fa-${key}` : `fa fa-${key}-square`} aria-hidden="true"></i></a>
		    );
		}

	    return (
			<div className="col-xs-12 col-ms-6 col-md-4 text-center">
				<div className="team-member">
					<img src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" data-original={`/img/team/${this.props.id}.jpg`} className="img-circle img-responsive lazy-loading-image" />

					<h3>{this.props.name} <img src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" data-original={`/img/flags/${this.props.country}.svg`} className="flag lazy-loading-image" /></h3>

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
