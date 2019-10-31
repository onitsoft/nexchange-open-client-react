import React from 'react';
import styles from './FeatureItem.scss';


export default function FeatureItem( { name, description } ) {

  // const keyFeatureImageLocation = `/img/white_label_page/key_feature/${name}.jpg`
  const keyFeatureImageLocation = 'http://www.placekitten.com/120/110'

  return (
    <React.Fragment>
      <div className={styles.profile}>
        <img src={keyFeatureImageLocation} alt={`${name} feature`} />
      </div>
      <div className={styles.description}>
        {description}
      </div>
    </React.Fragment>
  )
}