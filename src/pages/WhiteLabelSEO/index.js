import React from 'react'
import { I18n } from 'react-i18next'
import styled from '@emotion/styled'
import Bounce from 'react-reveal/Bounce'

import { graphql } from 'react-apollo'

import VideoCard from 'Components/WhiteLabel/VideoCard/'
import MajorCard from 'Components/WhiteLabel/MajorCard/'
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/'
import FAQ from 'Components/WhiteLabel/FAQ2/'
import PriceTable from 'Components/WhiteLabel/PriceTable/'
import TopicsList from './topics'

import GET_WHITELABEL from './get-whitelabel.query' 

const WhiteLabelSEO = ({data, ...props}) => {
  const { pages } = data
  const { articles, faq, features, main } = (pages && pages[0]) || {}
  console.log('what is dat main:', main)
  return (
    <I18n ns="translations">
      {t => (
        <StyledWhitelabel>
            <VideoCard />
            <div className='container'>
              <Bounce bottom cascade>
                {/* <section className='row'><KeyFeatures features={features} /></section> */}
                <section className='row'>
                  <MajorCard
                    title={main && main.title}
                    content={main && main.content}
                    art={main && main.art && main.art.url}
                  />
                </section>
                <section className='row'><SupportedAssets /></section>
                <section className='row'><TopicsList articles={articles} /></section>
                <section className='row'><PriceTable plans={plans} /></section>
                <section className='row'><FAQ items={faq} /></section>
              </Bounce>
            </div>
        </StyledWhitelabel>
      )}
    </I18n>
  )
}

const StyledWhitelabel = styled.main`
  padding: 100px 0 75px 0;
  text-align: center;
  strong {
    font-family: Clan Offc Pro Medium;
  }
  > section {
    margin: 12rem 0;
  }
  > .container {
    > .row {
      margin-top: 12rem;
    }
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
    monthly: 200,
    duration: 12,
    devhours: 1,
    hourprice: 100,
    coinlist: 5000,
    chatbot: true,
    support: true
  },
  {
    name: 'fiat',
    setup: 5000,
    monthly: 400,
    duration: 12,
    devhours: 2,
    hourprice: 100,
    coinlist: 5000,
    chatbot: true,
    support: true
  },
  {
    name: 'ieo',
    setup: 9800,
    monthly: 800,
    duration: 12,
    devhours: 4,
    hourprice: 100,
    coinlist: 0,
    chatbot: true,
    support: true
  }
]


export default graphql(GET_WHITELABEL)(WhiteLabelSEO)
