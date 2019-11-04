import React, { Fragment } from 'react'
import { Col } from 'reactstrap'
import { I18n } from 'react-i18next'
import { SectionHeading } from 'Pages/WhiteLabelSEO'

import FeatureItem from './FeatureItem'

export default function KeyFeatures() {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <Col md={12}>
            <SectionHeading>{ t('keyfeatures.title') }</SectionHeading>
          </Col>
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