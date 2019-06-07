import React from 'react';
import styles from './About.scss';
import { I18n, Trans } from 'react-i18next';

const About = () => (
  <I18n ns="translations">
    {t => (
      <div id="about" className={styles.about}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title">{t('about.title')}</h2>
            </div>

            <div className="col-xs-12">
              <div className="col-xs-12 co-sm-12 col-md-6 col-lg-6">
                <p>{t('about.1')}</p>
              </div>
              <div className="col-xs-12 co-sm-12 col-md-6 col-lg-6">
                <span>{t('about.2')}</span>
                <p>{t('about.3')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </I18n>
);

export default About;
