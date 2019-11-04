import React, { useState, useMemo, useCallback } from 'react'
import { Col, Button } from 'reactstrap'
import YouTube from 'react-youtube'
import styles from './VideoCard.scss'
import { I18n } from 'react-i18next'
import Support from './Support'


const VideoCard = () => {
  const [showSupportModal, setShowSupportModal] = useState(false)
  const youtubeOptions = useMemo(() => ({
    width: '480px',
    height: '270px',
    onPlay: () => {
      window.gtag('event', 'Whitelabel Video', {event_category: 'interaction', event_label: `Video Start`});
    },
    onEnd: () => {
      window.gtag('event', 'Whitelabel Video', {event_category: 'interaction', event_label: `Video Finished`});
    }
  }), [])

  const onContactUs = useCallback(() => {
    setShowSupportModal(s => !s)
    window.gtag('event', 'Whitelabel Hero', {event_category: 'interaction', event_label: `Click Contact Us`});
  }, [])


  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.videoContainer}>
          <div className='container'>
            <Col md="6">
              <h1>{ t('videocard.title') }</h1>
              <Button>{ t('videocard.livepreview') }</Button>
              <Button onClick={onContactUs}>{ t('videocard.contactus') }</Button>
            </Col>
            <Col md="6">
              <YouTube videoId="7ujmzb3HzCA" opts={youtubeOptions} />
            </Col>
          </div>
          <Support show={showSupportModal} onClose={() => setShowSupportModal(false)} />
        </div>
      )}
    </I18n>
  )
}

export default VideoCard