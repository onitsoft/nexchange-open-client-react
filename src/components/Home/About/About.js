import React from 'react';
import TeamMember from './TeamMember/TeamMember';

const About = () => (
  <div id="about">
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h2>About Us</h2>

          <p>
            N.exchange is a fast, reliable and fully transparent cryptocurrency exchange built by crypto enthusiasts, for crypto
            enthusiasts.
          </p>
          <p>We are a group of multi-national, multi-disciplinary cryptocurrency professionals.</p>
          <p>
            Our team came together to make this platform after seeing firsthand the need for a fast and reliable exchange on the crypto
            market.
          </p>
          <p>
            We pride ourselves on total transparency: Everything is viewable through our API, starting from order lists and ending with our
            coin reserves.{' '}
          </p>
          <p>
            N.exchange is built on several core values that guide our team in our day to day operations. Among them are complete
            transparency, a strive to help make cryptocurrency as accessible as possible, and a passion for open source.
          </p>
          <p>
            To support our mission of making crypto accessible to everyone, we’ve made our{' '}
            <b>
              <a href="https://github.com/onitsoft/nexchange-open-client-react" target="_blank" rel="noopener noreferrer">
                front end client completely open source <i className="fab fa-github" aria-hidden="true" />
              </a>
            </b>.
          </p>

          <div id="team-members" className="row">
            <TeamMember
              id="oleg"
              name="Oleg Belousov"
              country="IL"
              fullCountryName="Israel"
              description={
                <p>
                  Multidisciplinary coder. Aspiring innovator with a deep passion for open source and making the world better, step by step,
                  every single day.
                </p>
              }
              social={{
                linkedin: 'https://www.linkedin.com/in/oleg-belousov-b4112145/',
                twitter: 'https://twitter.com/iooleg',
                medium: 'https://medium.com/@IoOleg',
                github: 'https://github.com/BeOleg',
              }}
            />

            <TeamMember
              id="sarunas"
              name="Šarūnas Ažna"
              country="LT"
              fullCountryName="Lithuania"
              description={<p>Backend developer and physicist. Animation fan, cryptocurrencies enthusiast and plays the saxophone.</p>}
              social={{
                linkedin: 'https://www.linkedin.com/in/%C5%A1ar%C5%ABnas-a%C5%BEna-102220b2/',
                github: 'https://github.com/SarunasAzna',
              }}
            />

            <TeamMember
              id="karolis"
              name="Karolis Ramanauskas"
              country="LT"
              fullCountryName="Lithuania"
              description={<p>Full-stack developer. Entrepreneur by heart. Enjoys bringing products to life through code.</p>}
              social={{
                linkedin: 'https://www.linkedin.com/in/karolisram/',
                github: 'https://github.com/superkarolis/',
                medium: 'https://medium.com/@karolisram',
                twitter: 'https://twitter.com/superkarolis',
                rss: 'https://www.karolisram.com/',
              }}
            />

            <TeamMember
              id="justas"
              name="Justas Vitėnas"
              country="LT"
              fullCountryName="Lithuania"
              description={
                <p>
                  User exeperience specialist with 7 years of experience. Worked with plenty of successful projects in the block-chain,
                  crypto, startup, e-commerce industries.
                </p>
              }
              social={{
                linkedin: 'https://www.linkedin.com/in/justas-vitenas-77383ab6/',
              }}
            />

            <TeamMember
              id="justas"
              name="Justas Ažna"
              country="LT"
              fullCountryName="Lithuania"
              description={
                <p>
                  DevOps orchestrator. Shuffling Docker, Swarm & Kubernetes. Proponent for micro-component design and seamless scalability.
                </p>
              }
              social={{
                linkedin: 'https://www.linkedin.com/in/justasazna/',
                github: 'https://github.com/reederz',
              }}
            />

            <TeamMember
              id="paulina"
              name="Paulina Bagińska"
              country="PL"
              fullCountryName="Poland"
              description={
                <p>
                  Product management magician. Loves to build and improve product usability. Blockchain novice. Women in tech supporter and
                  recreational weight lifter.
                </p>
              }
              social={{
                linkedin: 'https://www.linkedin.com/in/baginskapaulina/',
                twitter: 'https://twitter.com/PaulinaBGGC',
              }}
            />

            <TeamMember
              id="cyrus"
              name="Cyrus Ghazanfar"
              country="US"
              fullCountryName="United States"
              description={
                <p>
                  Cornell University MEng, Computer Science.<br />
                  Passionate about programming, astronomy and decentralised and distributed systems.
                </p>
              }
              social={{
                linkedin: 'https://www.linkedin.com/in/cyrus-ghazanfar-a0998a53/',
                github: 'https://github.com/cyzanfar',
                rss: 'https://cyzanfar.github.io/',
                'stack-overflow': 'http://stackoverflow.com/users/3307520/cyzanfar',
              }}
            />

            <TeamMember
              id="you"
              name="You?"
              description={
                <div>
                  <p>
                    We are actively hiring for the N.exchange dream team. We are especially on the lookout for talented developers,
                    marketing personnel, a community manager and content writers.
                  </p>
                  <p>
                    Drop us a line at <a href="mailto:careers@n.exchange">careers@n.exchange</a>.
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
