import React from 'react';
import Countdown from 'react-countdown-now';
import CountdownItem from './CountdownItem/CountdownItem';
import Ellipse from './Ellipse/Ellipse';
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
            <Ellipse coin="coss" style={{ left: -40, bottom: -10, width: 36, height: 36 }} />
            <Ellipse coin="eos" style={{ left: '70%', top: -20, width: 32, height: 32 }} />
            <Ellipse coin="btc" style={{ right: -20, top: 20, width: 48, height: 48 }} />

            <div className={styles.countdown}>
              <h4>Pre-sale starts in</h4>
              <Countdown date={Date.now() + (Date.parse('2018-07-01') - Date.now())} renderer={renderer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICO;
