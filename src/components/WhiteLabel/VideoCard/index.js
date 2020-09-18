import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { HashLink } from 'react-router-hash-link';
import styled from '@emotion/styled';
import { I18n } from 'react-i18next';
import Support from './Support';
import Ellipses from 'Components/Ellipses';

const VideoCard = props => {
  const { title, content } = props;
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [videoInViewport, setVideoInViewport] = useState(true);
  const [showPip, setShowPip] = useState(true);

  const scrollListener = () => {
    if (showPip) {
      if (window.pageYOffset > window.screen.height && videoInViewport) {
        setVideoInViewport(false);
        return;
      }
      if (window.pageYOffset < window.screen.height && !videoInViewport) {
        setVideoInViewport(true);
        return;
      }
    }
  };

  const handleClosePipMode = () => {
    setShowPip(false);
    setVideoInViewport(true);
    window.removeEventListener('scroll', scrollListener);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);

  return (
    <I18n ns="translations">
      {(t, { lng }) => (
        <StyledContainer videoInViewport={videoInViewport}>
          <div className="container">
            <Col className="tls">
              <h1>{title}</h1>
              <HashLink smooth to={`/${lng}/instant-white-label#application`}>
                <Button>Apply Now</Button>
              </HashLink>
            </Col>
            <StyledYoutube videoInViewport={videoInViewport} className="vid-container">
              <div className="vid">{content}</div>
              <div className="pip-icons">
                <div className="social">
                  <a
                    href="https://twitter.com/intent/tweet?text=Set%20up%20your%20own%20DEX%20cryptocurrency%20exchange%20in%201%20hour%20by%20@nexchangeCC&url=https://www.youtube.com/watch?v=7ujmzb3HzCA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=7ujmzb3HzCA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f" aria-hidden="true" />
                  </a>
                </div>
                <button type="button" onClick={handleClosePipMode}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            </StyledYoutube>
          </div>

          <Ellipses />
          <Support show={showSupportModal} onClose={() => setShowSupportModal(false)} subject="Whitelabel Enquiry" />
        </StyledContainer>
      )}
    </I18n>
  );
};

const Col = styled.div``;

const StyledYoutube = styled.div`
  @media (min-width: 1280px) {
    ${props =>
      !props.videoInViewport && {
        position: 'fixed !important',
        width: '30rem',
        top: 'initial !important',
        bottom: '2rem !important',
        right: '2rem !important',
        background: '#222834',
      }}
  }
`;

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
    color: #fff;
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

    > .vid-container {
      width: ${props => props.videoInViewport && '100%'};
      .vid {
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
        width: 100%;
        position: relative;
      }

      .pip-icons {
        display: none;
        @media (min-width: 1280px) {
          padding: 1rem;
          display: ${props => (props.videoInViewport ? 'none' : 'flex')};
          justify-content: space-between;
          align-items: center;
          a {
            padding: 0 1rem;
          }
          button {
            background: none;
            border: none;
          }
          i {
            color: #ffffff;
            font-size: 1.5rem;
          }
        }
      }
      iframe {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
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
`;

export default VideoCard;
