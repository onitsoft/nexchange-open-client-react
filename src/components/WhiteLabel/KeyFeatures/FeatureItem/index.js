import React, { Fragment } from 'react'
import styles from './FeatureItem.scss'


export default function FeatureItem( { name, description, art } ) {

  const imgPath = art || 'http://www.placekitten.com/200/200'
  const imgAltText = name

  return (
    <Fragment>
      <div className={ styles.art }>
        <img src={ imgPath } alt={ imgAltText } />
      </div>
      <div className={ styles.description }>
        { description }
      </div>
    </Fragment>
  )
}