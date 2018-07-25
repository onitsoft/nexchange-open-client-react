import React from 'react';
import { I18n } from 'react-i18next';

const RefundCancellation = props => {
  return (
    <I18n ns="translations">
      {t => (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2>{t('refund.title')}</h2>

              <p>{t('refund.1')}</p>
              <p>{t('refund.2')}</p>
              <p>{t('refund.3')}</p>
              <p>
                {t('refund.4')} <a href="mailto:support@n.exchange">support@n.exchange</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default RefundCancellation;
