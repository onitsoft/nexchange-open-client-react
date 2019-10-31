import React, { Fragment } from 'react'
import { Col } from 'reactstrap'
import styles from './MinorCard.scss'


export default function MinorCard({ topic , text }) {

  // const imgPath = `/img/white_label_page/feature/${topic}.jpg`
  const imgPath = 'http://www.placekitten.com/300/300'
  const imgAltText = { topic }


  return (
    <Fragment>
      <Col md={12}>
        <h2>{ topic }</h2>
      </Col>
      <Col md={6}>
        { text }
      </Col>
      <Col md={6}>
        <img src={ imgPath } alt={ imgAltText } />
      </Col>
    </Fragment>
  )
}