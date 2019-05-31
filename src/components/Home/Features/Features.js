import React from 'react';
import { I18n } from 'react-i18next';

import styles from './Features.scss';

const Features = () => {
    return (
        <I18n ns="translations">
            {t => ( 
                <div className="container">
                    <div className={`row ${styles.container}`}>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <h2 className="title">{t('features.heading')}</h2>
                        </div>
                        <div className={styles.features}>
                            <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4 ${styles.feature}`}>
                                <div className={styles.icon}></div>
                                <p className={styles.name}>{t('features.feature11')}</p>
                                <p className={styles.description}>{t('features.feature12')}</p>
                            </div>
                            <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4 ${styles.feature}`}>
                                <div className={styles.icon}></div>
                                <p className={styles.name}>{t('features.feature21')}</p>
                                <p className={styles.description}>{t('features.feature22')}</p>
                            </div>
                            <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4 ${styles.feature}`}>
                                <div className={styles.icon}></div>
                                <p className={styles.name}>{t('features.feature31')}</p>
                                <p className={styles.description}>{t('features.feature32')}</p>
                            </div>
                            <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4 ${styles.feature}`}>
                                <div className={styles.icon}></div>
                                <p className={styles.name}>{t('features.feature41')}</p>
                                <p className={styles.description}>{t('features.feature42')}</p>
                            </div>
                            <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4 ${styles.feature}`}>
                                <div className={styles.icon}></div>
                                <p className={styles.name}>{t('features.feature51')}</p>
                                <p className={styles.description}>{t('features.feature52')}</p>
                            </div>
                            <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4 ${styles.feature}`}>
                                <div className={styles.icon}></div>
                                <p className={styles.name}>{t('features.feature61')}</p>
                                <p className={styles.description}>{t('features.feature62')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </I18n>
    );
}

export default Features;