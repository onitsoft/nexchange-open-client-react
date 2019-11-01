import React from 'react'
import { Col } from 'reactstrap'
import YouTube from 'react-youtube'
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

  const videoID = "7ujmzb3HzCA"
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
            <YouTube videoId={ videoID } opts={ youtubeOptions } />
          </Col>
        </Wrapper>
      )}
    </I18n>
  )
}