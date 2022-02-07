import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  grid-auto-flow: row;
  place-items: center;
  background: #ffffff;
  z-index: 10;
  width: 100%;
  max-height: 150px;

  box-shadow: 0 11px 32px -5px rgba(54, 61, 77, 0.15);
  transition: max-height 0.4s ease-out;

  > img {
    display: none;
  }

  &.hide-announcement {
    max-height: 0px;
  }

  @media (min-width: 769px) {
    position: fixed;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    padding: 16px;
    width: fit-content;
    grid-auto-flow: column;
    border-radius: 8px;
    box-shadow: 0 10px 24px 0 rgba(54, 61, 77, 0.15);
    max-height: initial;
    transition: bottom 0.5s ease-out;

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
  padding: 8px;

  > div {
    margin: 0.25rem;
    color: #222c31;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    
    h4 {
      font-size: 16px;
      font-weight: 700;
      display: block;
    }
    p {
      font-size: 14px;
      margin: 0;
    }
  }

  button {
    color: white;
    background-color: #1d31b6;
    height: 4rem;
    border: none;
    border-radius: 4px;
    padding: 0 32px;
  }

  a {
    color: #ffffff;
  }

  @media (min-width: 769px) {
    flex-direction: row;
    padding: 0 16px;

    > div {
      h4 {
        font-size: 16px;
      }
      p {
        font-size: 14px;
      }
    }

    button {
      color: white;
      margin-left: 16px;
      padding: 0 18px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;
  padding: 8px;

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

const CookiePolicyModal = () => {
  const [shouldShow, setShouldShow] = useState(false);

  const handleAcceptCookies = () => {
    setShouldShow(false);
    window.localStorage.setItem('isCookiesAccepted', 'true');
  };

  useEffect(() => {
    if (window.localStorage.isCookiesAccepted === 'true') setShouldShow(false);
    else setShouldShow(true)
  }, []);

  return (
    <Container className={cx(shouldShow ? null : 'hide-announcement')}>
      <img src="/img/icons/star.svg" alt="" />
      
      <Content>
        <div className='text-container'>
          <p>Yoa.ltd web app uses cookies to deliver and maintain services.</p>
          <p>Please accept cookies usage.</p>
        </div>
        
        <button onClick={handleAcceptCookies}>
          Accept
        </button>
      </Content>
      
    </Container>
  );
};

export default CookiePolicyModal;