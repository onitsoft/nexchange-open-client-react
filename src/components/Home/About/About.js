import React from 'react';

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
        </div>
      </div>
    </div>
  </div>
);

export default About;
