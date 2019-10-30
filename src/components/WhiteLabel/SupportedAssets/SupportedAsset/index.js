import React from 'react';
import styles from './SupportedAsset.scss';


export default function SupportedAsset( { name } ) {

  const supportedAssetImageLocation = `/img/supported_asset/${name}.jpg`

  return (
    <React.Fragment>
      <div className={styles.profile}>
        <img src={supportedAssetImageLocation} alt={`${name}`} />
      </div>
      <div className={styles.title}>
        {name}
      </div>
    </React.Fragment>
  )
}