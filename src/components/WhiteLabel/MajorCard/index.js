import React, { Fragment } from 'react'
import { I18n } from 'react-i18next'

import styled from '@emotion/styled'
import Marked from 'react-markdown'

import nlogo from '../logo.png'

export const MajorCard = (props) => {
  const { title, content, art } = props
  return (
    <I18n ns="translations">
      {t => (
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
      )}
    </I18n>
  )
}

export default MajorCard

const StyledCard = styled.article`
  display: grid;
  grid-column-gap: 10rem;
  grid-row-gap: 2rem;
  grid-template-areas: 
    "title"
    "content";
  text-align: left;
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
    }
    > .content {
      width: 100%;
    }
  }
  
  
`