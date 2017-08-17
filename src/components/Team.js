import React, { Component } from 'react';
import team from '../img/team.jpg';

class Team extends Component {
  render() {
    return (
      <div id="Team" className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>About Us</h1>

            <p>We are a group of multi-national, multi-disciplinary, multi-planetary (just kidding) cryptocurrency enthusiasts and professionals.</p>
            <p>Our team came together to make the Nexchange platform after seeing the need for a fast and reliable exchange on the crypto market firsthand.</p>
            <p>We pride ourselves on total transparency: Everything is completely and viewable through our API, starting from order lists and ending with our coin reserves.</p>
            <p>Nexchange, a platform made by crypto enthusiasts, for crypto enthusiasts.</p>

            <img className="img-rounded img-responsive" src={team} alt="Team photo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
