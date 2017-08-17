import React, { Component } from 'react';
import team from '../img/team.jpg';

class Team extends Component {
  render() {
    return (
      <div id="Team" className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>About Us</h1>

            <p>We are a group of multi-national, multi-disciplinary, multi-planetary (just kidding) professionals.
            Each one of us has a rich experience in his unique domain, and together we create an unbeatable team.</p>

            <p>We came together to make the Nexchange Platform after observing the latest developments in the cryptocurrency world with great pain (in regards to exchanges performance / reliability).</p>

            <p>However, instead of standing still and coping with the situation we decided to create our own platform, based on a 100% open and transparent API, and a 100% open source Frontend code.</p>

            <p>All the orders and the transactions on the platform are completely transparent to everyone, as well as our reserves.</p>

            <p>Nexchange is a platform made by crypto enthusiasts, for crypto enthusiasts.</p>

            <p>Our commitment to our community is to:</p>
            
            <ul>
              <li>Maintain minimal spreads over the entire course of our operation.</li>
              <li>Never take or hold a position against a client.</li>
              <li>Keep minimal execution times as our flagship, never deliberately hinder orders because of market conditions.</li>
              <li>Guaranteed execution: we will never revert or refund an Order which was accepted by our API.</li>
            </ul>

            <p>We believe the best purpose of achieving our goal is via the community, using open source and our open API</p>
            <p>Thus, we encourage every each and one of you to fork one of our example repositories and make your own client of the exchange API.</p>

            <p><b>Nexchange is a platform made by crypto enthusiasts, for crypto enthusiasts.</b></p>

            <img className="img-rounded img-responsive" src={team} alt="Team photo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
