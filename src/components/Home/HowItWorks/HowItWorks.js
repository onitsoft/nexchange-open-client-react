import React from 'react';
import { I18n } from 'react-i18next';

import styles from './HowItWorks.scss';

const HowItWorks = () => {
    return (
        <I18n ns="translations">
            {t => ( 
                <div className="container">
                    <div className={`row ${styles.container}`}>
                        <div className={`col-sm-12 ${styles.heading}`}>
                            <h2 className="title">{t('howitworks.heading')}</h2>
                        </div>
                        <div className={styles.howitworks}>
                            <div className="col-sm-12">
                                <div className={`col-sm-1`}></div>
                                <div className={`col-sm-1 ${styles['arrow-container']}`}>
                                    <div className={styles['arrow-label']}>
                                        <span>ETH</span>
                                    </div>
                                    <div className={styles.arrow}>
                                        <div className={styles.line}></div>
                                        <div className={styles.point}></div>
                                    </div>
                                </div>
                                <div className={`col-sm-1`}></div>
                                <div className={`col-sm-1 ${styles['arrow-container']}`}>
                                    <div className={styles['arrow-label']}>
                                        <span>ETH</span>
                                    </div>
                                    <div className={styles.arrow}>
                                        <div className={styles.line}></div>
                                        <div className={styles.point}></div>
                                    </div>
                                </div>
                                <div className={`col-sm-1`}></div>
                            </div>
                            <div className="col-sm-12">
                                <div className={`col-sm-1 ${styles['arrow-container']}`}>
                                    <div className={styles['arrow-label']}>
                                        <span>ETH</span>
                                    </div>
                                    <div className={styles.arrow}>
                                        <div className={styles.line}></div>
                                        <div className={styles.point}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className={`col-sm-1`}></div>
                                <div className={`col-sm-1 ${styles['arrow-container']}`}>
                                    <div className={styles['arrow-label']}>
                                        <span>DOGE</span>
                                    </div>
                                    <div className={styles.arrow}>
                                        <div className={styles.line}></div>
                                        <div className={styles.point}></div>
                                    </div>
                                </div>
                                <div className={`col-sm-1`}></div>
                                <div className={`col-sm-1 ${styles['arrow-container']}`}>
                                    <div className={styles['arrow-label']}>
                                        <span>DOGE</span>
                                    </div>
                                    <div className={styles.arrow}>
                                        <div className={styles.line}></div>
                                        <div className={styles.point}></div>
                                    </div>
                                </div>
                                <div className={`col-sm-1`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </I18n>
    );
}

export default HowItWorks;