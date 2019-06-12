import React from 'react';
import { I18n } from 'react-i18next';

import styles from './HowItWorks.scss';

const HowItWorks = () => {
  return (
    <I18n ns="translations">
      {t => (
        <div className="container hidden-sm  hidden-xs">
          <div className={`row ${styles.container}`}>
            <div className={`col-sm-12 ${styles.heading}`}>
              <img src="/img/cogsandgears.svg" alt="Cogs and Gears" />
              <span className={styles.subtitle}>{t('howitworks.subtitle')}</span>
              <h2 className="title">{t('howitworks.heading')}</h2>
            </div>
            <div className={styles.howitworks}>
              <div className={`col-xs-12 ${styles.row}`}>
                <div className={`col-xs-12 col-sm-12 col-md-3 col-lg-3 ${styles.section}`}>
                  <img src="/img/howitworks1.svg" alt="How it works" />
                  <div className={styles.label}>
                    <span className="bold">{t('howitworks.text1')}</span>
                  </div>
                </div>
                <div
                  className={`col-xs-12 col-sm-12 col-md-2 col-lg-2 ${styles['arrow-container']}
                                                ${styles['arrow-green']}`}
                >
                  <div className={styles['arrow-label']}>
                    <span>ETH</span>
                  </div>
                  <div className={styles.arrow}>
                    <div className={styles.line} />
                    <div className={styles.point}>⌵</div>
                  </div>
                </div>
                <div className={`col-xs-12 col-sm-12 col-md-2 col-lg-2`}>
                  <div className={styles.section}>
                    <span className="bold">DragonDex</span>
                    <span>{t('howitworks.text2')}</span>
                  </div>
                </div>
                <div
                  className={`col-xs-12 col-sm-12 col-md-2 col-lg-2 ${styles['arrow-container']}
                                                ${styles['arrow-purple']}`}
                >
                  <div className={styles['arrow-label']}>
                    <span>ETH</span>
                  </div>
                  <div className={styles.arrow}>
                    <div className={styles.line} />
                    <div className={styles.point}>⌵</div>
                  </div>
                </div>
                <div className={`col-xs-12 col-sm-12 col-md-3 col-lg-3 ${styles.section}`}>
                  <img src="/img/howitworks2.svg" alt="How it works" />
                  <span className="bold">{t('howitworks.text3')}</span>
                </div>
              </div>
              <div className={`col-sm-12 col-md-11 col-lg-11 ${styles['row-mid']}`}>
                <div className={`col-xs-12 col-sm-12 col-md-2 col-lg-2`}>
                  <div
                    className={`${styles['arrow-container']} 
                                    ${styles['arrow-down']} ${styles['arrow-purple']}`}
                  >
                    <div className={styles.arrow}>
                      <div className={styles.line} />
                      <div className={styles.point}>⌵</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-xs-12 ${styles.row}`}>
                <div className={`col-xs-12 col-sm-12 col-md-3 col-lg-3 ${styles.section}`}>
                  <img src="/img/howitworks4.svg" alt="How it works" />
                  <div className={styles.label}>
                    <span className="bold">{t('howitworks.text6')}</span>
                  </div>
                </div>
                <div
                  className={`col-xs-12 col-sm-12 col-md-2 col-lg-2 ${styles['arrow-container']}  
                                                ${styles['arrow-left']} ${styles['arrow-orange']}`}
                >
                  <div className={styles['arrow-label']}>
                    <span>DOGE</span>
                  </div>
                  <div className={styles.arrow}>
                    <div className={styles.line} />
                    <div className={styles.point}>⌵</div>
                  </div>
                </div>
                <div className={`col-xs-12 col-sm-12 col-md-2 col-lg-2`}>
                  <div className={styles.section}>
                    <span className="bold">DragonDex</span>
                    <span>{t('howitworks.text5')}</span>
                  </div>
                </div>
                <div
                  className={`col-xs-12 col-sm-12 col-md-2 col-lg-2 ${styles['arrow-container']}
                                                 ${styles['arrow-left']} ${styles['arrow-red']}`}
                >
                  <div className={styles['arrow-label']}>
                    <span>DOGE</span>
                  </div>
                  <div className={styles.arrow}>
                    <div className={styles.line} />
                    <div className={styles.point}>⌵</div>
                  </div>
                </div>
                <div className={`col-xs-12 col-sm-12 col-md-3 col-lg-3 ${styles.section}`}>
                  <img src="/img/howitworks3.svg" alt="How it works" />
                  <span className={`bold ${styles.margintop}`}>{t('howitworks.text4')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default HowItWorks;
