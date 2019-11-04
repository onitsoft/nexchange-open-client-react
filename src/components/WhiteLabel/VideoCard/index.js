import React from 'react'
import { Col } from 'reactstrap'
import { I18n } from 'react-i18next'
import styled from 'styled-components'


const Wrapper = styled.div`
  text-align: left;
`

const Form = styled.form`
  display: inline;
`

export default function VideoCard() {
  const youtubeOptions = {
    width: '500px',
    height: '300px'
  }
`

const IframeContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
  height: 0;
  max-width: 100%;
`

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

  const videoID = "7ujmzb3HzCA"

const YTPlayer = () => {
  return (
  <IframeContainer>
    <Iframe src={ `https://www.youtube.com/embed/${videoID}` } frameBorder="0" title="Set up your own cryptocurrency exchange" />
  </IframeContainer>
  )
}

export default function VideoCard() {

  const contactFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSeb6gJNO3i1VEW3XqjAcXD9SJjQExu2ymw6pIMLniq7CTa_GQ/viewform?usp=sf_link"

  return (
    <I18n ns="translations">
      {t => (
        <Wrapper className='container'>
          <Col md={6}>
            <h1>{ t('videocard.title') }</h1>
            <button className="btn btn-themed btn-lg"> { t('videocard.livepreview') } </button>
            <Form action={ contactFormURL }>
              <button className="btn btn-themed btn-lg" type="submit">{ t('videocard.contactus') }</button>
            </Form>
          </Col>
          <Col md={6}>
            <YTPlayer />
          </Col>
        </Wrapper>
      )}
    </I18n>
  )
}