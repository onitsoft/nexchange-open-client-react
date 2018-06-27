import React from 'react';
import styles from './Ellipse.scss';

const Ellipse = props => {
  return (
    <div className={`${styles.container} hidden-xs`} style={props.style}>
      <div className={styles.ellipse}>
        <img src={require(`Img/ellipses/${props.coin}.svg`)} alt="LTC" />
      </div>
    </div>
  );
};

export default Ellipse;
