import React, { Fragment } from 'react'
import styles from './FeatureItem.scss'


export default function FeatureItem( { name, description } ) {

  const imgPath = 'http://www.placekitten.com/200/200'
  const imgAltText = name

  return (
    <Fragment>
      <div className={ styles.profile }>
        <img src={ imgPath } alt={ imgAltText } />
      </div>
      <div className={ styles.description }>
        { description }
      </div>
    </Fragment>
  )
}