import React from 'react'
import { Col } from 'reactstrap'
import styles from './MinorCard.scss'
import { I18n, Trans } from 'react-i18next'


function MinorCard({ topic }) {

  const featureImageLocation = `/img/white_label_page/feature/${topic}.jpg`

  return (
    <React.Fragment>
      <Col md={6}>
        <h2>{topic}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nisi nec nunc euismod condimentum.</p>
        <p>Aenean efficitur metus vel posuere hendrerit. </p>
        <p>Sed ut arcu vel velit tempor fermentum vel varius dui. Duis lacus dolor, euismod id.</p>
      </Col>
      <Col md={6}>
        <p>{featureImageLocation}</p>
      </Col>
    </React.Fragment>
  )
}

export default MinorCard