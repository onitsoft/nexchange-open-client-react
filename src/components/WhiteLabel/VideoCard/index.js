import React from 'react'
import { Col } from 'reactstrap'
import { I18n } from 'react-i18next'
import styled from '@emotion/styled'


const Wrapper = styled.div`
  font-family: "Clan Offc Pro Book", sans-serif;
  font-size: 14px;
  line-height: 1.42857;
  color: #fff;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  text-align: left;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  @media(min-width: 768px) {
    width: 750px;
  }
  @media(min-width: 992px) {
    width: 970px;
  }
  @media(min-width: 1200px) {
    width: 1170px;
  }
`

const Form = styled.form`
  display: inline;
`

const Button = styled.button`
  -webkit-appearance: button;
  -webkit-tap-highlight-color: transparent;
  background-color: #044264;
  border-radius: 4px;
  border: none;
  display: inline-block;
  font-family: 'Clan Offc Pro Medium';
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.05em;
  line-height: 1.33333;
  margin: 8px 8px;
  padding: 8px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  white-space: nowrap;
  will-change: box-shadow, transform;
  &:hover {
    background-color: #033855;
  }
  @media(min-width: 365px) {
    margin: 10px 10px;
  }
  @media(min-width: 750px) {
    padding: 12px 30px;
    border-radius: 4px;
    margin: 12px 12px;
    font-size: 16px;
  }
  @media(min-width: 1536px) {
    padding: 14px 36px;
    border-radius: 5px;
    margin: 16px 16px;
    font-size: 18px;
  }
`

const PrimaryHeading = styled.h1`
  font-size: 3rem;
  @media(min-width: 750px) {
    font-size: 4rem;
  }
  @media(min-width: 1536px) {
    font-size: 5rem;
  }
  @media(min-width: 2048px) {
    font-size: 7rem;
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
  const livePreviewURL = "https://n.exchange"

  return (
    <I18n ns="translations">
      {t => (
        <Wrapper>
          <Col md={6}>
            <PrimaryHeading>{ t('videocard.title') }</PrimaryHeading>
            <Form action={ livePreviewURL }>
              <Button type="submit">{ t('videocard.livepreview') }</Button>
            </Form>
            <Form action={ contactFormURL }>
              <Button type="submit">{ t('videocard.contactus') }</Button>
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