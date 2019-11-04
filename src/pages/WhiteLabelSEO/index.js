import React from 'react'
import { I18n } from 'react-i18next'

import VideoCard from 'Components/WhiteLabel/VideoCard/'
import KeyFeatures from 'Components/WhiteLabel/KeyFeatures/'
import MajorCard from 'Components/WhiteLabel/MajorCard/'
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/'
import MinorCard from 'Components/WhiteLabel/MinorCard/'
import FAQ from 'Components/WhiteLabel/FAQ2/'

import styled from '@emotion/styled'
import styles from './WhiteLabelSEO.scss'

const SectionHeading = styled.h2`
  margin-top: 0;
  margin-bottom: 0px;
  font-weight: 400;
  font-size: 2rem;
  font-family: 'Clan Offc Pro Book';
  @media(min-width: 750px) {
    font-size: 3rem;
  }
  @media(min-width: 1536px) {
    font-size: 4rem;
  }
  @media(min-width: 2048px) {
    font-size: 4.5rem;
  }


    @media (min-width: $screen-md-min) {
      font-size: 24px;
    }

    @media (min-height: $screen-lg-height) and (min-width: $screen-md-min) {
      margin-bottom: 0;
`

const TextContent = styled.p`
  font-family: "Clan Offc Pro Book", sans-serif;
  color: #fff;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  word-wrap: break-word;
  font-size: 16px;
  line-height: 1.5em;
  margin: 0 0 18px 0;
`

export default function WhiteLabelSEO() {
  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.whitelabel}>
          <div className='container'>
            <VideoCard />
            <KeyFeatures />
            <MajorCard />
            <SupportedAssets />
            <MinorCard topic={ t('minorcard.topic1title') } text={ t('minorcard.topic1text') } />
            <MinorCard topic={ t('minorcard.topic2title') } text={ t('minorcard.topic2text') } />
            <MinorCard topic={ t('minorcard.topic3title') } text={ t('minorcard.topic3text') } />
            <FAQ />
          </div>
        </div>
      )}
    </I18n>
  )
}

export { SectionHeading, TextContent }