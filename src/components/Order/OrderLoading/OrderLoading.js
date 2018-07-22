import React from 'react';
import { I18n } from 'react-i18next';

const OrderLoading = () => {
  return (<div className="text-center">
      <I18n ns="translations">
		{(t) => (
          <h2>{t('loading')}...</h2>
        )}
      </I18n>
    </div>);
};

export default OrderLoading;
