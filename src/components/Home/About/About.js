import React from 'react';
import styles from './About.scss';
import { I18n, Trans } from 'react-i18next';

const About = () => (
<I18n ns="translations">
{(t) => (
  <div className={styles.about}>
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h2 className="title">About Us</h2>

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
              <a href="https://github.com/onitsoft/nexchange-open-client-react" target="_blank" rel="noopener noreferrer">
                front end client completely open source
              </a>
            </b>.
          </p>
          </Trans>
        </div>
      </div>
    </div>
  </div>
)}
</I18n>
);

export default About;
