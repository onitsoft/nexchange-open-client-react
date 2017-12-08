import React, { Component } from 'react';
import config from '../config';
import ReferralTerms from '../components/ReferralTerms';


class ReferralBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showTermsModal: false
		}
	}

	render() {
		return (
			<div id="share-referral" className="col-xs-12">
				<div className="box">
					<div className="row">
						<div className="col-xs-12">
							<h2>Share this unique referral link with your friends to earn some coins!</h2>
							<h4>Here is your unique referral link: <a href={`${config.DOMAIN}?ref=${this.props.order.referral_code[0].code}`} className="text-green" target="_blank" onClick={this.trackRefShare}>{config.DOMAIN}/?ref={this.props.order.referral_code[0].code}</a></h4>
							<h4><a href="javascript:void(0)" onClick={() => this.setState({showTermsModal: true})}>Terms & Conditions</a></h4>

							<h4>Share it on social!</h4>
							
							<div className="share">
							    <a href={`https://facebook.com/sharer.php?u=${config.DOMAIN}?ref=${this.props.order.referral_code[0].code}`} target="_blank" onClick={this.trackRefShare}><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
							    <a href={`https://twitter.com/intent/tweet?url=${config.DOMAIN}?ref=${this.props.order.referral_code[0].code}&text=I’m%20using%20Nexchange,%20the%20easiest%20and%20fastest%20cryptocurrency%20exchange!`} target="_blank" onClick={this.trackRefShare}><i className="fa fa-twitter-square" aria-hidden="true"></i></a>
							   	<a href={`https://www.linkedin.com/shareArticle?mini=true&url=${config.DOMAIN}?ref=${this.props.order.referral_code[0].code}`} target="_blank" onClick={this.trackRefShare}><i className=	"fa fa-linkedin-square" aria-hidden="true"></i></a>
							</div>
						</div>
					</div>
				</div>

				<ReferralTerms show={this.state.showTermsModal} onClose={() => this.setState({showTermsModal: false})} />
			</div>
		);
	}
};

export default ReferralBox;
