import React from 'react';
import styles from './ICO.scss';

const ICO = () => {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <h2>A WHOLE ECO-SYSTEM</h2>
            <h3>Accommodate all of your crypto needs under one roof</h3>

            <a href="https://n.exchange/ico" className={`${styles.btn} btn btn-block btn-primary`}>
              JOIN OUR ICO
            </a>
          </div>

          <div className="col-xs-12 col-sm-6">
            <h4>Pre-sale starts in</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICO;
