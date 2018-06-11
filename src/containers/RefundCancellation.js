import React from 'react';
import { I18n } from 'react-i18next';

const RefundCancellation = props => {
  return (
    <div className="container">
      <div className="row">
	  <I18n ns="translations">
	  {(t) => ( 
        <div className="col-xs-12">
          <h2>{t('refund.title')}</h2>

          <p>
            {t('refund.1')}
          </p>
          <p>{t('refund.2')}</p>
          <p>
            {t('refund.3')}
          </p>
          <p>
            {t('refund.4')} <a href="mailto:support@nexchange.io">support@nexchange.io</a>
          </p>
        </div>
	  )}
	  </I18n>
      </div>
    </div>
  );
};

export default RefundCancellation;
