import React from 'react';
import Testimonial from './Testimonial.js';


const Testimonials = props => (
	<div id="testimonials">
		<div className="container">
			<div className="row">
				<div className="col-xs-12">
					<h2>Testimonials</h2>
				</div>
			</div>

			<div className="row">
				<Testimonial
					img="/img/testimonials/cryptotalk.jpg"
					name="Crypto Talk‏"
					network="twitter"
					link="https://twitter.com/bitreff/status/907478815890325504"
					text="Check Out @NexchangeIO with a Simple, Secure and a transparent exchange that you use without registration."
					date="September 11, 2017, 10:39 PM" />
				<Testimonial
					img="/img/testimonials/john.jpg"
					name="John Michael"
					network="facebook"
					link="https://www.facebook.com/rockztar.jm/posts/1475653122471191:0"
					text="Nexchange is the next big exchange… clean ui, mobile friendly, smooth transaction and transparent platform. I have tried different types exchanges but this platform delivers what I want…"
					date="September 11, 2017, 01:49 PM" />
				<Testimonial
					img="/img/testimonials/tomo.jpg"
					name="Tomo Adria"
					network="facebook"
					link="https://www.facebook.com/permalink.php?story_fbid=1884024031850695&id=100007293495907&substory_index=0"
					text="Best new instant exchange service! Fast, easy, low fees..."
					date="September 9, 2017, 22:30 PM" />
				<Testimonial
					img="/img/testimonials/hunterk.png"
					name="Hunterk13"
					network="bitcointalk"
					link="https://bitcointalk.org/index.php?topic=2165808.msg21736006#msg21736006"
					text="I traded $24,000 worth of BTC to LTC yesterday, great trustworthy exchange. Had a few hiccups but  everything was sorted out. Would use again. 😊"
					date="September 11, 2017, 07:51 PM" />
			</div>
		</div>
	</div>
)

export default Testimonials;