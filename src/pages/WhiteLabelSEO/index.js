import React from 'react'
import { I18n } from 'react-i18next'

import VideoCard from 'Components/WhiteLabel/VideoCard/'
import KeyFeatures from 'Components/WhiteLabel/KeyFeatures/'
import MajorCard from 'Components/WhiteLabel/MajorCard/'
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/'
import MinorCard from 'Components/WhiteLabel/MinorCard/'
import FAQ from 'Components/WhiteLabel/FAQ/'

import styles from './WhiteLabelSEO.scss'


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