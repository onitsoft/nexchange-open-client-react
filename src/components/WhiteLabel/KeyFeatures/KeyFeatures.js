import React from 'react';
import styles from './KeyFeatures.scss';
import { I18n } from 'react-i18next';


function KeyFeatures() {

  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.container}>
          <p>KeyFeatures</p>
        </div>
      )}
    </I18n>
  )
}

export default KeyFeatures