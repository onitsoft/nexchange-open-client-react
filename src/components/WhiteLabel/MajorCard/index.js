import React, { Fragment } from 'react'
import { Col } from 'reactstrap'
import { I18n } from 'react-i18next'
import { SectionHeading, TextContent } from 'Pages/WhiteLabelSEO'

const imageLocation = 'http://www.placekitten.com/550/350'
const imageAltText = 'placekitten'

export default function MajorCard() {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <Col md={12}>
            <SectionHeading>{ t('majorcard.title') }</SectionHeading>
          </Col>
          <Col md={6}>
            <TextContent>
              { t('majorcard.text') }
            </TextContent>
          </Col>
          <Col md={6}>
            <img src={ imageLocation } alt={ imageAltText } />
          </Col>
        </Fragment>
      )}
    </I18n>
  )
}