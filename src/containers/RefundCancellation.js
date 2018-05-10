import React from 'react';


const RefundCancellation = (props) => {
	return <div className="container">
		<div className="row">
			<div className="col-xs-12">
				<h2>Refund Policy</h2>

				<p>We will refund the value of the purchased currency by the rate quoted by our API at the time the currency reaches our account.</p>
				<p>No partial refunds are available.</p>
				<p>The maximal refund amount is 100% of the amount quoted at the time of purchase.</p>
				<p>Get in touch at <a href="mailto:support@nexchange.io">support@nexchange.io</a> for more information.</p>
			</div>
		</div>
	</div>;
};

export default RefundCancellation;