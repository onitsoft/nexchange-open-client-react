import React from 'react'
import { Col } from 'reactstrap'
import styles from './KeyFeatures.scss'
import { I18n } from 'react-i18next'

import FeatureItem from './FeatureItem/FeatureItem'


function KeyFeatures() {

  // const features = [
  //   { name: 'security', description: 'top' },
  //   { another... },
  //   { another... }

  // map over features array passing in values via props
  return (
    <I18n ns="translations">
      {t => (
        <React.Fragment>
          <Col md={12}>
            <h2>Key Features of Instant Exchange</h2>
          </Col>
          <Col md={4}>
            < FeatureItem name='Sec' description='Top' />
          </Col>
        </React.Fragment>
      )}
    </I18n>
  )
}

export default KeyFeatures