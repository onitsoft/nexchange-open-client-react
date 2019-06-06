import React from 'react';
import { I18n } from 'react-i18next';

import styles from './AllowedCurrencies.scss';

const AllowedCurrencies = () => {
    return (
        <I18n ns="translations">
            {t => ( 
                <div className="container">
                    <h2 className={`title ${styles.title}`}>{t('allowedcurrencies.heading')}</h2>
                    <div className={`row ${styles.container}`}>
                        <div className={`col-xs-12 col-sm-12 col-md-5 col-lg-5 ${styles.card}`}>
                            <div className={styles['card-section']}>
                                <img src='/img/dragon.svg' alt='Dragondex'></img>
                                <div className={styles.label}>
                                    <span className='bold'>{t('allowedcurrencies.text111')}</span>
                                    <span className={styles.gray}>{t('allowedcurrencies.text112')}</span>
                                </div>
                            </div>
                            <div className={styles.arrow}>
                                {/* eslint max-len: ["error", { "code": 9999 }] */} 
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAHNQAABzUB3AtqBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAATJSURBVHic7d1PaBxlGMfx35PdrNm2WQqlUCgULS4UVruBeQfWW1JqRIwgai3iQUpt/UM8FD0UFITeetFCVeqfSwPmUClRc/BgytpUgpuZ2ewWcnOpeCk9aYkl2+5mHw9dYTIa42ZnZ54tz+dU3nd25ilfJmRmDwGUUg8413XfdxznvbjnCAPFPUA3mJk8z/sYwFvtpU8ty5okIo5zrm70bRBmHvA87wKAE4GtLyzLeoOIWnHM1a2+DFIsFpPDw8NTAF7e4JDplZWVV8fGxppRzhWGvgviuu4ggK8AHNnk0K8BvGKMafR+qvAMxD1AJxYWFtIAvsHmMdA+ZqZYLA71dqpw9c0dsry8vGN1dXUWwGiHH/0xnU4/m8vl/uzBWKHrizukWq1ur9frM/hnjBv/cnhwbbRer89Uq9XtPRkuZOKDlEqlXY1G4yozHw5sXW82m08Ej2+vXfevMfPhRqNxtVQq7erlrGEQHaRcLu9OJBJzAKzAVimVSo0WCoVbwc8UCoVbqVRqFMBiYMtKJBJz5XJ5d4/GDYXYIJVKZW+r1ZoHMOJfJ6IFAE8dPHjw940+294bbx/rN9JqteYrlcre8CcOh8ggjuPsbzabPwE44F8norlkMjlujLm92TmMMbeTyeQ4Ec0Ftg40m81rjuPsD3PmsIgLsrS0lCWiIoCHA1vfZjKZiXw+f+f/niufz9/JZDITRPRdYOsRIip6nvdot/OGTVQQ13UfX1tbmwewz79ORJfT6fRL2Wz2bqfnzGazd4eGho4Q0eXA1j5mvuY4zmPdzBw2MUEWFxdHAFwBsCewdbFWqx3N5XL3tnruXC53r1arHQVwMbC1h4iulMvl/FbPHTYRD4ae5xWY+XsAOwNbX1qW9fp/vSh0XXfdm11jzIb/p/YLyc8BHA9s/UFET1uW9XOns4ct9jvE87xDzDyHQAxmPmdZ1skw39oSUcuyrBPMfC6wtZOZf/A871BY19qqWIO4rjvOzLMAgk/RZ2zbPtWL7zWIiG3bPgXgTGBrBzPPOo7zZNjX7ERsQVzXfQ7ALIBtga3TxpgPen399jVOB5a3EdFse7ZYxBLEcZwXAVwCkPItMxFNGmPORjWHMeYsEU0C8N+JDwG41J4xcpEH8TxvgoimAQz6lpmZ37Es65Oo52lf812sjzJIRNOu6z4T9TyRB2Hm81gfo8XMb9q2/VHUs/zNGPMh7n8v7/8FYhDA+ahnieNHlv+aa8x8zLbtz2KYYx1jzAVmPgZgzbcc+WNBHHfIcQA1ADeY+XnbtqeinmEjtm1PMfMLuP+dyi8DAwOvRT2DiAfDbnTyYNgPYn8wVOtpEGE0iDAaRBgNIowGEUaDCKNBhNEgwmgQYTSIMBpEGA0ijAYRRoMIo0GE0SDCaBBhNIgwGkQYDSKMBhFGgwijQYTRIMJoEGE0iDAaRBgNIowGEUaDCKNBhNEgwmgQYTSIMBpEGA0ijAYRRoMIo0GE0SDCaBBhNIgwGkQYDSKMBhFGgwijQYTRIMJoEGE0iDAaRBgNIowGEUaDCKNBhNEgwmgQYTSIMBpEGA0ijAYRRoMIo0GE0SDCaBBhNIgwGkQYDSLMgxDkN9+/f41riLD0fZD237K9CeAmEb0d9zxKqV76C8ZVVMY5aieoAAAAAElFTkSuQmCC">                               
                                </img>
                            </div>
                            <div className={styles['card-section']}>
                                <img src='/img/cryptotocrypto.svg' alt='Crypto to Crypto'></img>
                                <div className={styles.label}>
                                    <span className='bold'>{t('allowedcurrencies.text12')}</span>
                                </div>                            
                            </div>
                        </div>
                        <div className={`col-xs-12 col-sm-12 col-md-5 col-md-offset-1 col-lg-5 col-lg-offset-1 ${styles.card}`}>
                            <div className={styles['card-section']}>
                                <img src='/img/nexchange.svg' alt='N.Exchange'></img>
                                <div className={styles.label}>
                                    <span className='bold'>{t('allowedcurrencies.text211')}</span>
                                    <span className={styles.gray}>{t('allowedcurrencies.text212')}</span>
                                </div>                            
                            </div>
                            <div className={styles.arrow}>
                                {/* eslint max-len: ["error", { "code": 9999 }] */} 
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAHNQAABzUB3AtqBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAATJSURBVHic7d1PaBxlGMfx35PdrNm2WQqlUCgULS4UVruBeQfWW1JqRIwgai3iQUpt/UM8FD0UFITeetFCVeqfSwPmUClRc/BgytpUgpuZ2ewWcnOpeCk9aYkl2+5mHw9dYTIa42ZnZ54tz+dU3nd25ilfJmRmDwGUUg8413XfdxznvbjnCAPFPUA3mJk8z/sYwFvtpU8ty5okIo5zrm70bRBmHvA87wKAE4GtLyzLeoOIWnHM1a2+DFIsFpPDw8NTAF7e4JDplZWVV8fGxppRzhWGvgviuu4ggK8AHNnk0K8BvGKMafR+qvAMxD1AJxYWFtIAvsHmMdA+ZqZYLA71dqpw9c0dsry8vGN1dXUWwGiHH/0xnU4/m8vl/uzBWKHrizukWq1ur9frM/hnjBv/cnhwbbRer89Uq9XtPRkuZOKDlEqlXY1G4yozHw5sXW82m08Ej2+vXfevMfPhRqNxtVQq7erlrGEQHaRcLu9OJBJzAKzAVimVSo0WCoVbwc8UCoVbqVRqFMBiYMtKJBJz5XJ5d4/GDYXYIJVKZW+r1ZoHMOJfJ6IFAE8dPHjw940+294bbx/rN9JqteYrlcre8CcOh8ggjuPsbzabPwE44F8norlkMjlujLm92TmMMbeTyeQ4Ec0Ftg40m81rjuPsD3PmsIgLsrS0lCWiIoCHA1vfZjKZiXw+f+f/niufz9/JZDITRPRdYOsRIip6nvdot/OGTVQQ13UfX1tbmwewz79ORJfT6fRL2Wz2bqfnzGazd4eGho4Q0eXA1j5mvuY4zmPdzBw2MUEWFxdHAFwBsCewdbFWqx3N5XL3tnruXC53r1arHQVwMbC1h4iulMvl/FbPHTYRD4ae5xWY+XsAOwNbX1qW9fp/vSh0XXfdm11jzIb/p/YLyc8BHA9s/UFET1uW9XOns4ct9jvE87xDzDyHQAxmPmdZ1skw39oSUcuyrBPMfC6wtZOZf/A871BY19qqWIO4rjvOzLMAgk/RZ2zbPtWL7zWIiG3bPgXgTGBrBzPPOo7zZNjX7ERsQVzXfQ7ALIBtga3TxpgPen399jVOB5a3EdFse7ZYxBLEcZwXAVwCkPItMxFNGmPORjWHMeYsEU0C8N+JDwG41J4xcpEH8TxvgoimAQz6lpmZ37Es65Oo52lf812sjzJIRNOu6z4T9TyRB2Hm81gfo8XMb9q2/VHUs/zNGPMh7n8v7/8FYhDA+ahnieNHlv+aa8x8zLbtz2KYYx1jzAVmPgZgzbcc+WNBHHfIcQA1ADeY+XnbtqeinmEjtm1PMfMLuP+dyi8DAwOvRT2DiAfDbnTyYNgPYn8wVOtpEGE0iDAaRBgNIowGEUaDCKNBhNEgwmgQYTSIMBpEGA0ijAYRRoMIo0GE0SDCaBBhNIgwGkQYDSKMBhFGgwijQYTRIMJoEGE0iDAaRBgNIowGEUaDCKNBhNEgwmgQYTSIMBpEGA0ijAYRRoMIo0GE0SDCaBBhNIgwGkQYDSKMBhFGgwijQYTRIMJoEGE0iDAaRBgNIowGEUaDCKNBhNEgwmgQYTSIMBpEGA0ijAYRRoMIo0GE0SDCaBBhNIgwGkQYDSLMgxDkN9+/f41riLD0fZD237K9CeAmEb0d9zxKqV76C8ZVVMY5aieoAAAAAElFTkSuQmCC">                               
                                </img>
                            </div>
                            <div className={styles['card-section']}>
                                <img src='/img/fiattocrypto.svg' alt='Fiat to Crypto'></img>
                                <div className={styles.label}>
                                    <span className='bold'>{t('allowedcurrencies.text22')}</span>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </I18n>
    );
}

export default AllowedCurrencies;