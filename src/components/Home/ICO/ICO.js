import React from 'react';
import Countdown from 'react-countdown-now';
import CountdownItem from './CountdownItem/CountdownItem';
import Ellipse from './Ellipse/Ellipse';
import styles from './ICO.scss';
import { I18n } from 'react-i18next';

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
    <I18n ns="translations">
      {t => (
        <div className={styles.container} style={{'display': 'none'}}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-5 col-lg-6">
                <h2>{t('ico.title')}</h2>
                <h3>{t('ico.desc')}</h3>

                <a
                  href="https://n.exchange/ico"
                  className={`${styles.btn} btn btn-block btn-primary`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    window.gtag('event', 'ICO open from widget', {event_category: 'ICO', event_label: ``});
                  }}
                >
                  {t('ico.action')}
                </a>
              </div>

              <div className="col-xs-12 col-sm-push-1 col-sm-6 col-lg-5 col-lg-push-1">
                <Ellipse coin="coss" style={{ left: -40, bottom: -10, width: 36, height: 36 }} />
                <Ellipse coin="eos" style={{ left: '70%', top: -20, width: 32, height: 32 }} />
                <Ellipse coin="btc" style={{ right: -20, top: 20, width: 48, height: 48 }} />

                <div className={styles.countdown}>
                  <h4>{t('ico.presale')}</h4>
                  <Countdown date={Date.now() + (Date.parse('2018-07-15') - Date.now())} renderer={renderer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default ICO;
