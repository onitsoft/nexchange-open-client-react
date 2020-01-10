import React from 'react'

import styled from '@emotion/styled'
import Marked from 'react-markdown'

import nlogo from '../logo.png'

export const MajorCard = (props) => {
  const { title, content, art } = props
  return (
    <StyledCard>
      <h2>{ title }</h2>
      <main>
        <div className='art'>
          <img src={ art || nlogo } alt={ title } />
        </div>
        <div className='content'>
          <Marked source={content} />
        </div>
      </main>
    </StyledCard>
  )
}

export default MajorCard

const StyledCard = styled.article`
  display: grid;
  grid-column-gap: 10rem;
  grid-row-gap: 6rem;
  grid-template-areas: 
    "title"
    "content";
  text-align: left;
  @media screen and (max-width: 960px) {
    margin: 0 4rem;
  }
  > h2 {
    grid-area: title;
  }
  > main {
    grid-area: content;
    display: flex;
    
    > .art {
      margin: 0 8rem 0 0;
      width: 320px;
      > img {
        width: 320px;
      }
      @media screen and (max-width: 960px) {
        display: none;
      }
    }
    > .content {
      width: 100%;
    }
  }
  
  
`