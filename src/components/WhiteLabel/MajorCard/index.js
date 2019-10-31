import React, { Fragment } from 'react'
import { Col } from 'reactstrap'
import { I18n } from 'react-i18next'


const imageLocation = 'http://www.placekitten.com/550/350'
const imageAltText = 'placekitten'

export default function MajorCard() {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <Col md={12}>
            <h2>{ t('majorcard.title') }</h2>
          </Col>
          <Col md={6}>
            { t('majorcard.text') }
          </Col>
          <Col md={6}>
            <img src={ imageLocation } alt={ imageAltText } />
          </Col>
        </Fragment>
      )}
    </I18n>
  )
}