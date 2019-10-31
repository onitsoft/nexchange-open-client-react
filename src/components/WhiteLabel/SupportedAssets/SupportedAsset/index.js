import React, { Fragment } from 'react'
import styles from './SupportedAsset.scss'

export default function SupportedAsset( { coin: { name, src } } ) {
  return (
    <Fragment>
      <div className={styles.profile}>
        <img src={ src } alt={ `${name}` } />
      </div>
      <div className={styles.title}>
        { name }
      </div>
    </Fragment>
  )
}