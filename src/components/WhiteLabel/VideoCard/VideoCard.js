import React from 'react'
import { Col, Button } from 'reactstrap'
import YouTube from 'react-youtube'
import styles from './VideoCard.scss'
import { I18n, Trans } from 'react-i18next'


function VideoCard() {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Col md="6">
          <h1>Non-custodial Cryptocurrency Exchange White Label</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nisi nec nunc euismod condimentum.</p>
          <p>Aenean efficitur metus vel posuere hendrerit. </p>
          <p>Sed ut arcu vel velit tempor fermentum vel varius dui. Duis lacus dolor, euismod id.</p>
          <Button>Live Preview</Button>
          <Button>Contact Us</Button>
        </Col>
        <Col md="6">
          <YouTube videoId="7ujmzb3HzCA" />
        </Col>
      </div>
    </React.Fragment>
  )
}

export default VideoCard