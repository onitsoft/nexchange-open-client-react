import React from 'react';
import styles from './SupportedAsset.scss';

import coins from './images'

export default function SupportedAsset({ name }) {

 const coin = coins.filter(coin => coin.name === name)
 console.log(coin)

  return (
    <React.Fragment>
      <div className={styles.profile}>
        <img src={ coin.src } alt={ `${coin.name}` } />
      </div>
      <div className={styles.title}>
        {name}
      </div>
    </React.Fragment>
  )
}