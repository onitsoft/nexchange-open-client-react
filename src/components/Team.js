import React, { Component } from 'react';
import team from '../img/team.JPG';

class Team extends Component {
  render() {
    return (
      <div id="Team" className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>About Us</h1>

            <p>We are a group of multi-national, multi-disciplinary, multi-planetary (just kidding) professionals.
            Each one of us has a rich experience in in his unique domain, and together we create an unbeatable team.</p>

            <p>We came together to make the Nexchange Platfrorm after observing the latest developments in the cryptocurrency world with great pain (in regards to exchanges performance / reliability).
            However, instead of standing still and coping with the situation we decided to create our own platform, based on a 100% open and transparent API, and a 100% open source Frontend code.</p>

            <p>All the orders and the transactions on the platform are completely transparent to everyone, as well as our reserves.</p>

            <img className="img-rounded img-responsive" src={team} alt="Team photo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
