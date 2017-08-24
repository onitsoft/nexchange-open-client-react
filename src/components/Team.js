import React, { Component } from 'react';
import team from '../img/team.jpg';

class Team extends Component {
  render() {
    return (
      <div id="team" className="container">
        <div className="row">
          <div className="col-xs-12">
            <h3>About Us</h3>

            <p>Nexchange is a fast, reliable and fully transparent cryptocurrency exchange built by crypto enthusiasts, for crypto enthusiasts.</p>
            <p>We are a group of multi-national, multi-disciplinary, multi-planetary (just kidding) cryptocurrency professionals. Our team came together to make this platform after seeing firsthand the need for a fast and reliable exchange on the crypto market.</p>
            <p>We pride ourselves on total transparency: Everything is viewable through our API, starting from order lists and ending with our coin reserves.</p>
            <p>You can read more about us by checking our <i>FAQ section</i>. Our customer support phone numer is <a href="tel:+442081442192">+44(0)2081442192</a> (8AM - 8PM GMT+1).
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
