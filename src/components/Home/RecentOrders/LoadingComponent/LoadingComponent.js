import React from 'react';
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
    return <h2>Sorry, there was a problem loading the page :(</h2>;
  } else {
    return null;
  }
};

export default LoadingComponent;
