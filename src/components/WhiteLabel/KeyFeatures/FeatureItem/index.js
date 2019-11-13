import React, { Fragment } from 'react'
import styles from './FeatureItem.scss'


import nlogo from '../../logo.png'

export default function FeatureItem( { name, description, art } ) {

  const imgPath = art ||nlogo
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