import React, { Component } from 'react';
import team from '../img/team.JPG';

class Team extends Component {
  render() {
    return (
      <div id="Team" className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>About Us</h1>

            <p>We are a team of blah ablah</p>

            <img src={team} />
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
