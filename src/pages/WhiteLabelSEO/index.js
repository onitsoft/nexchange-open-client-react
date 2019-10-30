import React, { Fragment } from 'react'

import VideoCard from 'Components/WhiteLabel/VideoCard/'
import KeyFeatures from 'Components/WhiteLabel/KeyFeatures/'
import MajorCard from 'Components/WhiteLabel/MajorCard/'
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/'
import MinorCard from 'Components/WhiteLabel/MinorCard/'
import FAQ from 'Components/WhiteLabel/FAQ/'


export default function WhiteLabelSEO() {
  return (
    <Fragment>
      <VideoCard />
      <KeyFeatures />
      <MajorCard />
      <SupportedAssets />
      <MinorCard topic="interface" />
      <MinorCard topic="security" />
      <MinorCard topic="techreq" />
      <FAQ />
    </Fragment>
  )
}