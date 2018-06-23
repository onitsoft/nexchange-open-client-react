import React from 'react';
import styles from './CountdownItem.scss';

const CountdownItem = props => (
  <div className={styles.item}>
    <div className={styles.count}>{props.count}</div>
    <div className={styles.period}>{props.period}</div>
  </div>
);

export default CountdownItem;
