import React from 'react';
import Countdown from 'react-countdown-now';
import CountdownItem from './CountdownItem/CountdownItem';
import styles from './ICO.scss';

const renderer = ({ days, hours, minutes, seconds }) => (
  <div className={styles['countdown-container']}>
    <CountdownItem count={days} period="days" />
    <CountdownItem count={hours} period="hours" />
    <CountdownItem count={minutes} period="minutes" />
    <CountdownItem count={seconds} period="seconds" />
  </div>
);

const ICO = () => {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-5 col-lg-6">
            <h2>A WHOLE ECO-SYSTEM</h2>
            <h3>Accommodate all of your crypto needs under one roof</h3>

            <a href="https://n.exchange/ico" className={`${styles.btn} btn btn-block btn-primary`}>
              JOIN OUR ICO
            </a>
          </div>

          <div className="col-xs-12 col-sm-push-1 col-sm-6 col-lg-5 col-lg-push-1">
            <h4>Pre-sale starts in</h4>
            <Countdown date={Date.now() + (Date.parse('2018-07-01') - Date.now())} renderer={renderer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICO;
