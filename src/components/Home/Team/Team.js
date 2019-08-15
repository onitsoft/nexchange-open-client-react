import React from 'react';
import TeamMember from './TeamMember/TeamMember';
import { I18n } from 'react-i18next';
import styles from './Team.scss';

const Team = () => (
  <I18n ns="translations">
    {t => (
      <div className={styles.container}>
        <div className="container">
          <div className={`${styles.row} row`}>
            <div className="col-xs-12">
              <h2 className="title">{t('about.teamtitle')}</h2>
            </div>

            <TeamMember
              id="oleg"
              name="Oleg Belousov"
              country="IL"
              fullCountryName={t('about.israel')}
              description={t('about.oleg')}
              social={{
                linkedin: 'https://www.linkedin.com/in/oleg-b-b4112145/',
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
              description={<p>{t('about.cyrus')}</p>}
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
              description={t('about.alejandro')}
              social={{
                linkedin: 'https://www.linkedin.com/in/alejandro-ponce-8551a312/',
                'wikipedia-w': 'https://en.wikipedia.org/wiki/Alejandro_Ponce',
              }}
            />

            <TeamMember
              id="vincenzo"
              name="Vincenzo Roberti"
              description={t('about.vincenzo')}
              social={{
                linkedin: 'https://www.linkedin.com/in/vincenzo-roberti-6595aa6/',
              }}
            />

            <TeamMember
              id="charles"
              name="Charles Cunningham"
              description={t('about.charles')}
              social={{
                linkedin: 'https://www.linkedin.com/in/cicunningham/',
              }}
            />

            <TeamMember
              id="vit"
              name="Vít Jedlička"
              description={t('about.vit')}
              social={{
                linkedin: 'https://www.linkedin.com/in/vit-jedlicka-9115aa2/',
              }}
            />
          </div>
        </div>
      </div>
    )}
  </I18n>
);

export default Team;
