import React from 'react';
import { I18n } from 'react-i18next';

const OrderLoading = () => {
  return (
    <I18n ns="translations">
      {t => (
        <div className="text-center">
          <h2>{t('loading')}...</h2>
        </div>
      )}
    </I18n>
  );
};

export default OrderLoading;
