import React, { Component } from 'react';
import team from '../img/team.jpg';

class Team extends Component {
  render() {
    return (
      <div id="Team" className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>About Us</h1>

            <p>Nexchange is a fast, reliable and fully transparent cryptocurrency exchange built by crypto enthusiasts, for crypto enthusiasts.</p>
            <p>We are a group of multi-national, multi-disciplinary, multi-planetary (just kidding) cryptocurrency professionals. Our team came together to make this platform after seeing firsthand the need for a fast and reliable exchange on the crypto market.</p>
            <p>We pride ourselves on total transparency: Everything is viewable through our API, starting from order lists and ending with our coin reserves.</p>

            <img className="img-rounded img-responsive" src={team} alt="Team photo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
