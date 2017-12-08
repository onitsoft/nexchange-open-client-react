import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => (
	<footer>
		<div className="container">
			<ul>
				<li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
				<li><Link to="/privacy">Privacy Policy</Link></li>
				{/*<li><Link to="/refund-cancellation">Refund and Cancellation Policy</Link></li>*/}
			</ul>

			<p className="text-muted">All rights reserved, YOA LTD 2016-2017, England & Wales <a href="https://beta.companieshouse.gov.uk/company/10009845" target="_blank">registered company No. 10009845</a></p>
		</div>
	</footer>
);

export default Footer;
