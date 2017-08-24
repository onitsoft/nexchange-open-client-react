import React, { Component } from 'react';

import TeamMember from './TeamMember';

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
            <p>To support our mission of making crypto accessible to everyone, we’ve made our <a href="https://github.com/onitsoft/nexchange-open-client-react" target="_blank">front end client completely open source</a>.</p>
          </div>
        </div>

        <div id="team-members" className="row">
          <TeamMember id="oleg" name="Oleg Belousov" title="Founder" country="IL"
            description="Multidisciplinary coder. Aspiring innovator with a deep passion for open source and making the world better, step by step, every single day."
            social={{
              linkedin: "https://www.linkedin.com/in/oleg-belousov-b4112145/",
              twitter: "https://twitter.com/iooleg",
              medium: "https://medium.com/@IoOleg",
              github: "https://github.com/BeOleg",
            }} />

          <TeamMember id="mantas" name="Mantas Rukuiža" title="Business Development" country="LT"
            description="Heirloom 90's cliche leggings. Tumblr gentrify chia, pok pok forage you probably haven't heard of them cronut. +1 lomo wolf, master cleanse truffaut before they sold out."
            social={{
              linkedin: "https://www.linkedin.com/in/mantas-rukui%C5%BEa-136a84139/",
            }} />

          <TeamMember id="daniel" name="Daniel Blank" title="Product Manager" country="IL"
            description="Product manager. Former IDF and FinTech coder with a deep passion for great products. Cryptocurrency enthusiast since 2013."
            social={{
              linkedin: "https://www.linkedin.com/in/daniel-blank-72166284/",
            }} />

          <TeamMember id="sarunas" name="Šarūnas Ažna" title="Software Developer" country="LT"
            description="Backed developer and physicist. Fan of animation, crypto currencies and plays the saxophone."
            social={{
              linkedin: "https://www.linkedin.com/in/%C5%A1ar%C5%ABnas-a%C5%BEna-102220b2/",
              "github": "https://github.com/SarunasAzna",
            }} />

          <TeamMember id="karolis" name="Karolis Ramanauskas" title="Software Developer" country="LT"
            description="Heirloom 90's cliche leggings. Tumblr gentrify chia, pok pok forage you probably haven't heard of them cronut. +1 lomo wolf, master cleanse truffaut before they sold out."
            social={{
              linkedin: "https://www.linkedin.com/in/karolisram/",
              github: "https://github.com/ramkarolis/",
              medium: "https://medium.com/@karolisram",
            }} />

          <TeamMember id="justas" name="Justas Ažna" title="Software Developer" country="LT"
            description="Heirloom 90's cliche leggings. Tumblr gentrify chia, pok pok forage you probably haven't heard of them cronut. +1 lomo wolf, master cleanse truffaut before they sold out."
            social={{
              linkedin: "https://www.linkedin.com/in/justasazna/",
              github: "https://github.com/reederz",
            }} />
        </div>
      </div>
    );
  }
}

export default Team;
