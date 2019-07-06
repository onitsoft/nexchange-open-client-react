import React from 'react';
import { I18n } from 'react-i18next';
import './NotFound.css';

const NotFound = () => (
  <I18n ns="translations">
    {t => (
      <div id="not-found" className="row text-center">
        <div className="col-sm-12">
          <h2 style={{marginTop: 120}}>{t('error.notfound')}</h2>
        </div>
      </div>
    )}
  </I18n>
);

export default NotFound;
