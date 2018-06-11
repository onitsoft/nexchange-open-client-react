import React from 'react';
import TeamMember from './TeamMember/TeamMember';
import { I18n, Trans } from 'react-i18next';

const About = () => (
<I18n ns="translations">
{(t) => (
  <div id="about">
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h2>{t('about.title')}</h2>

          <p>
            {t('about.1')}
          </p>
          <p>{t('about.2')}</p>
          <p>
            {t('about.3')}
          </p>
          <p>
            {t('about.4')}
          </p>
          <p>
            {t('about.5')}
          </p>
          <Trans i18nKey="about.6">
          <p>
            To support our mission of making crypto accessible to everyone, we’ve made our{' '}
            <b>
              <a href="https://github.com/onitsoft/nexchange-open-client-react" target="_blank">
                front end client completely open source <i className="fab fa-github" aria-hidden="true" />
              </a>
            </b>.
          </p>
          </Trans>

          <div id="team-members" className="row">
            <TeamMember
              id="oleg"
              name="Oleg Belousov"
              country="IL"
              fullCountryName={t('about.israel')}
              description={t('about.oleg')}
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
              fullCountryName={t('about.lithuania')}
              description={t('about.sarunas')}
              social={{
                linkedin: 'https://www.linkedin.com/in/%C5%A1ar%C5%ABnas-a%C5%BEna-102220b2/',
                github: 'https://github.com/SarunasAzna',
              }}
            />

            <TeamMember
              id="karolis"
              name="Karolis Ramanauskas"
              country="LT"
              fullCountryName={t('about.lithuania')}
              description={t('about.karolis')}
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
              name="Justas Ažna"
              country="LT"
              fullCountryName={t('about.lithuania')}
              description={t('about.justas')}
              social={{
                linkedin: 'https://www.linkedin.com/in/justasazna/',
                github: 'https://github.com/reederz',
              }}
            />

            <TeamMember
              id="paulina"
              name="Paulina Bagińska"
              country="PL"
              fullCountryName={t('about.poland')}
              description={t('about.paulina')}
              social={{
                linkedin: 'https://www.linkedin.com/in/baginskapaulina/',
                twitter: 'https://twitter.com/PaulinaBGGC',
              }}
            />

            <TeamMember
              id="cyrus"
              name="Cyrus Ghazanfar"
              country="US"
              fullCountryName={t('about.US')}
              description={
                <p>
                  {t('about.cyrus')}
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
              name={t('about.you')}
              description={
                <Trans i18nKey="about.youdesc">
                <div>
                  <p>
                    We are actively hiring for the N.exchange dream team. We are especially on the lookout for talented developers,
                    marketing personnel, a community manager and content writers.
                  </p>
                  <p>
                    Drop us a line at <a href="mailto:careers@n.exchange">careers@n.exchange</a>.
                  </p>
                </div>
                </Trans>
              }
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)}
</I18n>
);

export default About;
