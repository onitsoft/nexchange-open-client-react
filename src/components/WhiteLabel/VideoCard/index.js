import React, { useState, useCallback } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { I18n } from 'react-i18next'
import Support from './Support'
import Ellipses from 'Components/Ellipses'

const VideoCard = (props) => {
  const { title, content } = props
  const [showSupportModal, setShowSupportModal] = useState(false)

  const onContactUs = useCallback(() => {
    setShowSupportModal(s => !s)
    window.gtag('event', 'Whitelabel Hero', {event_category: 'interaction', event_label: `Click Contact Us`});
  }, [])


  return (
    <I18n ns="translations">
      {t => (
        <StyledContainer>
          <div className='container'>
            <Col className='tls'>
              <h1>{title}</h1>
              <Button><Link to='/'>{ t('videocard.livepreview') }</Link></Button>
              <Button onClick={onContactUs}>{ t('videocard.contactus') }</Button>
            </Col>
            <Col className='vid'>
              {content}
            </Col>
          </div>

          <Ellipses />
          <Support show={showSupportModal} onClose={() => setShowSupportModal(false)} />
        </StyledContainer>
      )}
    </I18n>
  )
}

const Col = styled.div`

`

const StyledContainer = styled.div`
  position: relative;
  overflow: hidden;
  text-align: left;
  margin-top: -70px;
  > .container {
    min-height: 80vh;
    height: 100vh;
    position: relative;
    z-index: 2;
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 960px) {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    @media screen and (max-width: 960px) {
      > .tls {
        padding: 6rem 0;
        text-align: center;
      }
    }

    > .tls {
      h1 {
        text-shadow: 0 0 8px rgba(22, 22, 22, 0.7);
      }
      button {
        &:not(:last-of-type) {
          margin-right: 2rem;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
      }
    }

    > .vid {
      width: 100%;
      > div {
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
        width: 100%;
        position: relative;
      }
      iframe {
        position: absolute;
        left: 0; right: 0;
        top: 0; bottom: 0;
      }
    }
  }

  > .Ellipses {
    > .Ellipses__bg {
      > img {
        @media screen and (max-width: 960px) {
          display: none;
        }
      }
    }
  }
`

export default VideoCard