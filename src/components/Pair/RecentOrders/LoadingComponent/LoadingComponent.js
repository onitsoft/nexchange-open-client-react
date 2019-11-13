import React from 'react';
import { I18n } from 'react-i18next';
import styles from './LoadingComponent.scss';

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <div className={styles.rect1} />
        <div className={styles.rect2} />
        <div className={styles.rect3} />
        <div className={styles.rect4} />
        <div className={styles.rect5} />
        <div className={styles.rect6} />
        <div className={styles.rect7} />
        <div className={styles.rect8} />
        <div className={styles.rect9} />
        <div className={styles.rect10} />
      </div>
    );
  } else if (error) {
    // Handle the error state
    return <I18n ns="translations">{t => <h2>{t('error.loading')}</h2>}</I18n>;
  } else {
    return null;
  }
};

export default LoadingComponent;
