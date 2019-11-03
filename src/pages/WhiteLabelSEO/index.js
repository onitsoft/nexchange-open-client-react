import React from 'react'
import { I18n } from 'react-i18next'
import styled from '@emotion/styled'

import VideoCard from 'Components/WhiteLabel/VideoCard/'
import KeyFeatures from 'Components/WhiteLabel/KeyFeatures/'
import MajorCard from 'Components/WhiteLabel/MajorCard/'
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/'
import MinorCard from 'Components/WhiteLabel/MinorCard/'
import FAQ from 'Components/WhiteLabel/FAQ/'
import PriceTable from 'Components/WhiteLabel/PriceTable/'

import styles from './styles.css'



export default function WhiteLabelSEO() {
  return (
    <I18n ns="translations">
      {t => (
        <div className={ styles.whitelabel }>
          <VideoCard />
          <StyledContainer className='container'>
            <section className='row'><KeyFeatures /></section>
            <section className='row'><MajorCard /></section>
            <section className='row'><SupportedAssets /></section>
            <section className='row'><MinorCard topic={ t('minorcard.topic1title') } text={ t('minorcard.topic1text') } /></section>
            <section className='row'><MinorCard topic={ t('minorcard.topic2title') } text={ t('minorcard.topic2text') } /></section>
            <section className='row'><MinorCard topic={ t('minorcard.topic3title') } text={ t('minorcard.topic3text') } /></section>
            <section className='row'><PriceTable plans={plans} /></section>
            <section className='row'><FAQ /></section>
          </StyledContainer>
        </div>
      )}
    </I18n>
  )
}

const StyledContainer = styled.div`
  > .row:not(:first-of-type) {
    margin-top: 5rem;
  }
`


const plans = [
  {
    name: 'community',
    setup: 0,
    monthly: 0
  },
  {
    name: 'crypto',
    setup: 2500,
    monthly: 250,
    duration: 12,
    devhours: 1,
    hourprice: 100,
    coinlist: 5000,
  },
  {
    name: 'fiat',
    setup: 5000,
    monthly: 400,
    duration: 12,
    devhours: 2,
    hourprice: 100,
    coinlist: 5000,
  },
  {
    name: 'ieo',
    setup: 9800,
    monthly: 800,
    duration: 12,
    devhours: 4,
    hourprice: 100,
    coinlist: 0,
  }
]