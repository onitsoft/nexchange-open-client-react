import React from 'react';
import styles from './FeatureItem.scss';


function FeatureItem( { name, description } ) {

  const keyFeatureImageLocation = `/img/white_label_page/key_feature/${name}.jpg`

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

export default FeatureItem