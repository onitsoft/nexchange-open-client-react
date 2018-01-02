import React from 'react';
import TeamMember from './TeamMember';

const About = () => (
  <div id="about">
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h2>About Us</h2>

          <p>Nexchange is a fast, reliable and fully transparent cryptocurrency exchange built by crypto enthusiasts, for crypto enthusiasts.</p>
          <p>We are a group of multi-national, multi-disciplinary cryptocurrency professionals.</p>
          <p>Our team came together to make this platform after seeing firsthand the need for a fast and reliable exchange on the crypto market.</p>
          <p>We pride ourselves on total transparency: Everything is viewable through our API, starting from order lists and ending with our coin reserves. </p>
          <p>Nexchange is built on several core values that guide our team in our day to day operations. Among them are complete transparency, a strive to help make cryptocurrency as accessible as possible and a passion for open source.</p>
          <p>To support our mission of making crypto accessible to everyone, we’ve made our <b><a href="https://github.com/onitsoft/nexchange-open-client-react" target="_blank">front end client completely open source <i className="fa fa-github" aria-hidden="true"></i></a></b>.</p>

          <div id="team-members" className="row">
            <TeamMember id="oleg" name="Oleg Belousov" country="IL" fullCountryName="Israel"
              description="Multidisciplinary coder. Aspiring innovator with a deep passion for open source and making the world better, step by step, every single day."
              social={{
                linkedin: "https://www.linkedin.com/in/oleg-belousov-b4112145/",
                twitter: "https://twitter.com/iooleg",
                medium: "https://medium.com/@IoOleg",
                github: "https://github.com/BeOleg",
              }} />

            <TeamMember id="daniel" name="Daniel Blank" country="IL" fullCountryName="Israel"
              description="Product manager. Former IDF and FinTech coder with a deep passion for great products. Cryptocurrency enthusiast since 2013."
              social={{
                linkedin: "https://www.linkedin.com/in/daniel-blank-72166284/",
                twitter: "https://twitter.com/daniel_a_blank",
                quora: "https://www.quora.com/profile/Daniel-Blank-7",
              }} />

            <TeamMember id="sarunas" name="Šarūnas Ažna" country="LT" fullCountryName="Lithuania"
              description="Backend developer and physicist. Animation fan, cryptocurrencies enthusiast and plays the saxophone."
              social={{
                linkedin: "https://www.linkedin.com/in/%C5%A1ar%C5%ABnas-a%C5%BEna-102220b2/",
                "github": "https://github.com/SarunasAzna",
              }} />

            <TeamMember id="karolis" name="Karolis Ramanauskas" country="LT" fullCountryName="Lithuania"
              description="Full-stack developer. Entrepreneur by heart. Enjoys bringing products to life through code."
              social={{
                linkedin: "https://www.linkedin.com/in/karolisram/",
                github: "https://github.com/superkarolis/",
                medium: "https://medium.com/@karolisram",
              }} />

            <TeamMember id="justas" name="Justas Ažna" country="LT" fullCountryName="Lithuania"
              description="DevOps orchestrator. Shuffling Docker, Swarm & Kubernetes. Proponent for micro-component design and seamless scalability."
              social={{
                linkedin: "https://www.linkedin.com/in/justasazna/",
                github: "https://github.com/reederz",
              }} />

            <TeamMember id="chirag" name="Chirag Neb" country="IN" fullCountryName="India"
              description="Information Technology Generalist, International Trader, Growth Hacker and a newly minted Blockchain Fan!"
              social={{
                linkedin: "https://www.linkedin.com/in/chirag-neb-8b120886/",
                twitter: "https://twitter.com/chiragneb",
                github: "https://github.com/chiragneb",
              }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
