import React from 'react';
import { I18n } from 'react-i18next';
import '../css/not-found.scss';

const NotFound = () => (
  <div id="not-found" className="text-center">
	<I18n ns="translations">
	{(t) => (
		<h1>404</h1>
		<h2>{t('error.notfound')}</h2>
     )}
    </I18n>
  </div>
);

export default NotFound;
