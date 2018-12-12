import React from 'react';
import { I18n } from 'react-i18next';
import USP from './USP/USP';
import styles from './USPS.scss';

const USPS = () => {
  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.container}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="title">{t('usps.1')}</h2>
              </div>
            </div>

            <div className="row">
              <USP title={t('usps.2')} text={t('usps.3')} />
              <USP title={t('usps.4')} text={t('usps.5')} />
              <USP title={t('usps.6')} text={t('usps.7')} />
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default USPS;
