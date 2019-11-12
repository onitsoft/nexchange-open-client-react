import React, { Fragment } from 'react'
import { Col } from 'reactstrap'
import { I18n } from 'react-i18next'

import styled from '@emotion/styled'
import Marked from 'react-markdown'

import nlogo from '../logo.png'

const imageLocation = nlogo
const imageAltText = 'placekitten'

export default function MajorCard() {
  return (
    <I18n ns="translations">
      {t => (
        <StyledCard>
          <h2>{ t('majorcard.title') }</h2>
          <main>
            <div className='art'>
              <img src={ imageLocation } alt={ imageAltText } />
            </div>
            <Marked>{ t('majorcard.text') }</Marked>
          </main>
        </StyledCard>
      )}
    </I18n>
  )
}

const StyledCard = styled.article`
  display: grid;
  grid-column-gap: 10rem;
  grid-row-gap: 2rem;
  grid-template-areas: 
    "title"
    "content";
  > h2 {
    grid-area: title;
  }
  > main {
    grid-area: content;
    display: flex;
    > .art {
      align-self: flex-end;
      > img {
        width: 320px;
      }
    }
  }
  
  
`