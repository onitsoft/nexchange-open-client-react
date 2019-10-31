import React from 'react'
import { Col } from 'reactstrap'
import styles from './MajorCard.scss'
import { reactI18nextModule } from 'react-i18next/dist/commonjs/context'

const imageLocation = 'http://www.placekitten.com/300/300'

export default function MajorCard() {
  return (
    <React.Fragment>
      <Col md={12}>
        <h2>Turn-Key Solution to Start Your Own Instant Exchange</h2>
      </Col>
      <Col md={6}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nisi nec nunc euismod condimentum.</p>
        <p>Aenean efficitur metus vel posuere hendrerit. </p>
        <p>Sed ut arcu vel velit tempor fermentum vel varius dui. Duis lacus dolor, euismod id.</p>
      </Col>
      <Col md={6}>
        <img src={ imageLocation } />
      </Col>
    </React.Fragment>
  )
}