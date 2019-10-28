import React from 'react'
import { Container, Row } from 'reactstrap'

import VideoCard from './VideoCard/VideoCard'
import KeyFeatures from './KeyFeatures/KeyFeatures'
import MajorCard from './MajorCard/MajorCard'
import SupportedAssets from './SupportedAssets/SupportedAssets'
import MinorCard from './MinorCard/MinorCard'
import WhiteLabelFAQ from './WhiteLabelFAQ/WhiteLabelFAQ';

import styles from './WhiteLabel.scss'


function WhiteLabel() {
  return (
    <>
      <div className={styles.hero}>
        <Container>
          <Row>
            <VideoCard />
          </Row>
        </Container>
      </div>
      <Row>
        <KeyFeatures />
      </Row>
      <Row>
        <MajorCard />
      </Row>
      <Row>
        <SupportedAssets />
      </Row>
      <Row>
        <MinorCard topic="interface" />
      </Row>
      <Row>
        <MinorCard topic="security" />
      </Row>
      <Row>
        <MinorCard topic="techreq" />
      </Row>
      <Row>
        <WhiteLabelFAQ />
      </Row>
    </>
  )
}

export default WhiteLabel