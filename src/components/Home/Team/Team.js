import React from 'react';
import TeamMember from './TeamMember/TeamMember';
import styles from './Team.scss';

const Team = () => (
  <div className={styles.container}>
    <div className="container">
      <div className={`${styles.row} row`}>
        <div className="col-xs-12">
          <h2 className="title">The People Who Make it Happen</h2>
        </div>

        <TeamMember
          id="oleg"
          name="Oleg Belousov"
          country="IL"
          fullCountryName="Israel"
          description="Multidisciplinary coder. Aspiring innovator with
            a deep passion for open source and making the world better,
            step by step, every single day."
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
          description="Backend developer and physicist.
            Animation fan, cryptocurrencies enthusiast and plays the saxophone."
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
          description="Full-stack developer. Entrepreneur by heart.
            Enjoys bringing products to life through code."
          social={{
            linkedin: 'https://www.linkedin.com/in/karolisram/',
            github: 'https://github.com/superkarolis/',
            medium: 'https://medium.com/@karolisram',
            rss: 'https://www.karolisram.com/',
          }}
        />

        <TeamMember
          id="justasv"
          name="Justas Vitėnas"
          country="LT"
          fullCountryName="Lithuania"
          description="User exeperience specialist with 7 years of experience.
          Worked with plenty of successful projects in the blockchain, crypto,
          startup, e-commerce industries."
          social={{
            linkedin: 'https://www.linkedin.com/in/justas-vitenas-77383ab6/',
          }}
        />

        <TeamMember
          id="justas"
          name="Justas Ažna"
          country="LT"
          fullCountryName="Lithuania"
          description="DevOps orchestrator. Shuffling Docker, Swarm & Kubernetes.
            Proponent for micro-component design and seamless scalability."
          social={{
            linkedin: 'https://www.linkedin.com/in/justasazna/',
            github: 'https://github.com/reederz',
          }}
        />

        <TeamMember
          id="paulina"
          name="Paulina Bagińska"
          country="PL"
          fullCountryName="Paulina"
          description="Product management magician.
                Loves to build and improve product usability.
                Blockchain novice.
                Women in tech supporter and recreational weight lifter."
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
              Cornell University MEng, Computer Science. Learn how to teach, teach how to learn. Passionate about programming, astronomy and
              recently decentralised and<br />distributed systems.
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
          id="alejandro"
          name="Alejandro Ponce"
          description="Seasoned global investor, founder of Nexus Group, ToN Ventures,
          01Labs and 01Ventures. In 2013 named one of the Top 50 most influential people
          in Latin American private equity by Private Equity World."
          social={{
            linkedin: 'https://www.linkedin.com/in/alejandro-ponce-8551a312/',
            'wikipedia-w': 'https://en.wikipedia.org/wiki/Alejandro_Ponce',
          }}
        />

        <TeamMember
          id="vincenzo"
          name="Vincenzo Roberti"
          description="Serial entrepreneur, experienced in creating and building global technology 
          businesses within Broadcasting, Media and Security industries."
          social={{
            linkedin: 'https://www.linkedin.com/in/vincenzo-roberti-6595aa6/',
          }}
        />

        <TeamMember
          id="charles"
          name="Charles Cunningham"
          description="Senior software engineer and IT architect with nearly 40 years of industry
          experience. Currently working with blockchain technology to develop high capacity rate solutions."
          social={{
            linkedin: 'https://www.linkedin.com/in/cicunningham/',
          }}
        />
      </div>
    </div>
  </div>
);

export default Team;
