import React, { Fragment } from 'react'
import { Col } from 'reactstrap'
import styled from '@emotion/styled'
import { I18n } from 'react-i18next'

import FeatureItem from './FeatureItem'

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0px;
  font-weight: 400;
  font-size: 2rem;
  font-family: 'Clan Offc Pro Book';
  @media(min-width: 750px) {
    font-size: 3rem;
  }
  @media(min-width: 1536px) {
    font-size: 4rem;
  }
  @media(min-width: 2048px) {
    font-size: 4.5rem;
  }


    @media (min-width: $screen-md-min) {
      font-size: 24px;
    }

    @media (min-height: $screen-lg-height) and (min-width: $screen-md-min) {
      margin-bottom: 0;
`


export default function KeyFeatures() {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <Col md={12}>
            <Title>{ t('keyfeatures.title') }</Title>
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