import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  padding: 8px;
  display: flex;
  grid-auto-flow: row;
  place-items: center;
  background: #ffffff;
  z-index: 10;
  width: 25rem;
  left: 100%;
  transform: translateX(-100%);
  box-shadow: 0 11px 32px -5px rgba(54, 61, 77, 0.15);
  transition: bottom 0.5s ease-out;

  > img {
    display: none;
  }

  &.hide-announcement {
    bottom: -200px;
  }

  @media (min-width: 769px) {
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    padding: 16px;
    width: fit-content;
    grid-auto-flow: column;
    border-radius: 8px;
    box-shadow: 0 10px 24px 0 rgba(54, 61, 77, 0.15);

    > img {
      display: block;
    }

    &.hide-announcement {
      bottom: -120px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    color: #222c31;
    font-size: 12px;
    h4 {
      font-size: 14px;
      font-weight: 700;
      display: block;
    }
  }

  button {
    background-color: #1d31b6;
    height: 4rem;
    border: none;
    border-radius: 4px;
    padding: 0 18px;
  }

  a {
    color: #ffffff;
  }

  @media (min-width: 769px) {
    flex-direction: row;
    padding: 0 16px;

    > p {
      font-size: 14px;
      h4 {
        font-size: 16px;
      }
    }

    button {
      margin-left: 16px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;

  img {
    height: 24px;
  }

  @media (min-width: 769px) {
    position: static;

    img {
      height: initial;
    }
  }
`;

const Anouncement = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const { pathname, search } = useLocation();

  const handleHideAnnouncement = () => {
    setShowAnnouncement(false);
    window.sessionStorage.setItem('hideAnnouncement', true);
  };

  useEffect(() => {
    if (window.sessionStorage.hideAnnouncement === 'true') setShowAnnouncement(false);
  }, []);

  return (
    <Container className={cx(showAnnouncement ? null : 'hide-announcement')}>
      <img src="/img/icons/star.svg" alt="" />
      <Content>
        <p>
          <h4>Great News</h4>
          We have released a new version of our web app.
        </p>
        <button>
          <a href={`https://beta.n.exchange${pathname}${search}`}>Check it out</a>
        </button>
      </Content>
      <CloseButton onClick={handleHideAnnouncement}>
        <img src="/img/icons/close.png" alt="close" />
      </CloseButton>
    </Container>
  );
};

export default Anouncement;
