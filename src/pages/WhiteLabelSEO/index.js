import React, { Fragment } from 'react'

import VideoCard from 'Components/WhiteLabel/VideoCard/'
import KeyFeatures from 'Components/WhiteLabel/KeyFeatures/'
import MajorCard from 'Components/WhiteLabel/MajorCard/'
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/'
import MinorCard from 'Components/WhiteLabel/MinorCard/'
import FAQ from 'Components/WhiteLabel/FAQ/'

import styles from './styles.css'
import style from 'react-syntax-highlighter/dist/styles/hljs/dracula'



export default function WhiteLabelSEO() {
  return (
    <div className={styles.whitelabel}>
      <div className='container'> 
        <VideoCard />
        <KeyFeatures />
        <MajorCard />
        <SupportedAssets />
        <MinorCard topic="interface" />
        <MinorCard topic="security" />
        <MinorCard topic="techreq" />
        <FAQ />
      </div>
    </div>
  )
}