import React from 'react'
import { Col, Button } from 'reactstrap'
import YouTube from 'react-youtube'
import styles from './VideoCard.scss'
import { I18n } from 'react-i18next'


export default function VideoCard() {
  const youtubeOptions = {
    width: '480px',
    height: '270px'
  }
  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.videoContainer + ' container'}>
          <Col md="6">
            <h1>{ t('videocard.title') }</h1>
            <Button>{ t('videocard.livepreview') }</Button>
            <Button>{ t('videocard.contactus') }</Button>
          </Col>
          <Col md="6">
            <YouTube videoId="7ujmzb3HzCA" opts={youtubeOptions} />
          </Col>
        </div>
      )}
    </I18n>
  )
}