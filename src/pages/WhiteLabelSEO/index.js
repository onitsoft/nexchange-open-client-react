import React from 'react'
import { I18n } from 'react-i18next'
import styled from '@emotion/styled'
import Marked from 'react-markdown'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import VideoCard from 'Components/WhiteLabel/VideoCard/'
import KeyFeatures from 'Components/WhiteLabel/KeyFeatures/'
import MajorCard from 'Components/WhiteLabel/MajorCard/'
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/'
import MinorCard from 'Components/WhiteLabel/MinorCard/'
import FAQ from 'Components/WhiteLabel/FAQ2/'
import PriceTable from 'Components/WhiteLabel/PriceTable/'

import styles from './styles.css'



const WhiteLabelSEO = ({data, ...props}) => {
  const { pages } = data
  const { articles, faq, features } = (pages && pages[0]) || {}

  return (
    <I18n ns="translations">
      {t => (
        <div className={ styles.whitelabel }>
          <VideoCard />
          <StyledContainer className='container'>
            <section className='row'><KeyFeatures features={features} /></section>
            <section className='row'><MajorCard /></section>
            <section className='row'><SupportedAssets /></section>
            <TopicsContainer className='row'>
              <TopicsList articles={articles} />
            </TopicsContainer>
            <section className='row'><PriceTable plans={plans} /></section>
            <section className='row'><FAQ items={faq} /></section>
          </StyledContainer>
        </div>
      )}
    </I18n>
  )
}

const TopicsList = (props) => {
  const { articles } = props
  if (!articles || !articles.length) return <>Loading...</>
  return articles.map((article, index) => 
    <TopicCard key={`topic-${index}`} title={article.title} content={article.content} art={article.art.url} />
  )
}

const TopicCard = ({ title, content, art }) => {
  return (
    <StyledTopic>
      <div className='art'>
        <img src={art} alt={title} />
      </div>
      <section>
        <h3>{title}</h3>
        <Marked source={content} />
      </section>
    </StyledTopic>
  )
}
const StyledTopic = styled.article`
  display: grid;
  grid-column-gap: 10rem;
  grid-row-gap: 2rem;
  grid-template-areas: 
    "art content";
  
  grid-template-columns: 330px auto;
  grid-template-rows: auto;

  &:nth-child(even) {
    grid-template-areas: 
      "content art";
    
    grid-template-columns: auto 330px;
  }
  &:not(:last-of-type) {
    margin-bottom: 12rem;
  }

  > .art {
    grid-area: art;
    padding: 2rem;
    > img {
    }
  }
  > section {
    grid-area: content;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const TopicsContainer = styled.section`
  margin: 8rem 0;
`

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

const faq = gql`
  query GetWhitelabel {
    pages(where: {name: "whitelabel"}) {
      articles (orderBy: sort_ASC) {
        title
        content
        date
        createdAt
        art {
          fileName
          url
        }
      }
      faq {
        title
        content
      }
      features {
        title
        content
        art {
          fileName
          url
        }
      }
    }
  }
`

export default graphql(faq)(WhiteLabelSEO)
