import React from 'react';
import { I18n } from 'react-i18next';

const TermsConditions = () => {
  return (
    <I18n ns="translations">
      {t => (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2>{t('terms.1')}</h2>
              <p>{t('terms.2')}</p>
              <p>{t('terms.3')}</p>
              <p>{t('terms.4')}</p>
              <p>{t('terms.5')}</p>
              <p>{t('terms.6')}</p>
              <p>{t('terms.7')}</p>
              <p>{t('terms.8')}</p>
              <p>{t('terms.9')}</p>
              <p>{t('terms.10')}</p>
              <p>{t('terms.11')}</p>

              <ol>
                <li>{t('terms.13')}</li>
                <li>{t('terms.14')}</li>
                <li>{t('terms.15')}</li>
              </ol>

              <p>{t('terms.12')}</p>

              <h3>{t('refund.title')}</h3>

              <p>{t('refund.11')}</p>
              <p>{t('refund.12')}</p>
              <p>{t('refund.13')}</p>
              <br />
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default TermsConditions;
