import React from 'react';
import { I18n } from 'react-i18next';
import './NotFound.css';

const NotFound = () => (
  <I18n ns="translations">
    {t => (
      <div id="not-found" className="text-center">
        <h1>404</h1>
        <h2>{t('error.notfound')}</h2>
      </div>
    )}
  </I18n>
);

export default NotFound;
