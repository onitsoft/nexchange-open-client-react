import React from 'react';

import Metamask from './Metamask/Metamask';

import styles from './Integrations.scss';

const Integrations = props => {
    return (<div className={styles.container}>
                <div className={styles['separator-container']}>
                    <div className={styles.separator}></div>
                    <span>Or connect with</span>
                    <div className={styles.separator}></div>
                </div>
                <div className={styles.integrations}>
                    <Metamask />
                </div>
            </div>)
}



export default Integrations;
