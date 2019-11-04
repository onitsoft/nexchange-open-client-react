import React from 'react'
import { Col } from 'reactstrap'
import styles from './SupportedAsset.scss'

export default function SupportedAsset({ coin: { symbol, name, src } }) {
  return (
    <Col md={3}>
      <div className={styles.profile}>
        <img src={src} alt={`${name}`} />
      </div>
      <div className={styles.title}>
        {name}
      </div>
    </Col >
  )
}