import React, { Fragment } from 'react'
import { Col } from 'reactstrap'
import styles from './KeyFeatures.scss'
import { I18n } from 'react-i18next'

import FeatureItem from './FeatureItem'

const KeyFeatures = ({features, ...props}) => {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <Col md={12}>
            <h2>{ t('keyfeatures.title') }</h2>
          </Col>
          {features && features.length && features.map(({title, content, art}, index) => (
              <Col md={4} key={`feature-${index}`}>
                <FeatureItem name={title} description={content} art={art && art.url} />
              </Col>
          ))}
          <Col md={4}>
            < FeatureItem name={ t('keyfeatures.feature1name') } description={ t('keyfeatures.feature1desc') } />
          </Col>
          <Col md={4}>
            < FeatureItem name={ t('keyfeatures.feature2name') } description={ t('keyfeatures.feature2desc') } />
          </Col>
          <Col md={4}>
            < FeatureItem name={ t('keyfeatures.feature3name') } description={ t('keyfeatures.feature3desc') } />
          </Col>
          <Col md={4}>
            < FeatureItem name={ t('keyfeatures.feature4name') } description={ t('keyfeatures.feature4desc') } />
          </Col>
          <Col md={4}>
            < FeatureItem name={ t('keyfeatures.feature5name') } description={ t('keyfeatures.feature5desc') } />
          </Col>
          <Col md={4}>
            < FeatureItem name={ t('keyfeatures.feature6name') } description={ t('keyfeatures.feature6desc') } />
          </Col>
        </Fragment>
      )}
    </I18n>
  )
}

export default KeyFeatures