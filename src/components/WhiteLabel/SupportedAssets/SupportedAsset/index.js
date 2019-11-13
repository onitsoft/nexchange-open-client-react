import React from 'react'
import { Col } from 'reactstrap'
import styled from '@emotion/styled'
import Bounce from 'react-reveal/Bounce'
import { NavLink } from 'react-router-dom'

export default function SupportedAsset({ coin: { name, src, linkTo } }) {
  return (
    <StyledCol md={3}>
      <Bounce bottom>
        <NavLink to={linkTo}>
          <StyledArt>
            <img src={src} alt={`${name}`} />
          </StyledArt>
          <StyledTitle>
            {name}
          </StyledTitle>
        </NavLink>
      </Bounce>
    </StyledCol >
  )
}

const StyledCol = styled(Col)`
  height: 230px;
  margin-bottom: 2rem;
  a {
    text-decoration: none;
    font-weight: bold;
  }
`

const StyledTitle = styled.div`
  margin: 15px 0;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  &:hover {
    color: #000;
    font-weight: 600;
    text-decoration: underline;
  }
`

const StyledArt = styled.div`
  position: relative;
  text-align: center;
  > img {
    display: inline-block;
    height: 180px;
    width: auto;
    filter: grayscale(100%);
    transition: all 120ms ease-in-out;
  }
  &:hover {
    > img {
      filter: grayscale(23%);
    }
  }
`