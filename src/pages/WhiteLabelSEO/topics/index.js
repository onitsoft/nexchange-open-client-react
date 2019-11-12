import React from 'react'
import Bounce from 'react-reveal/Bounce'
import Marked from 'react-markdown'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

export const TopicsList = (props) => {
  const { articles } = props
  if (!articles || !articles.length) return <>Loading...</>

  return articles.map((article, index) => (
    <TopicCard
      key={`topic-${index}`}
      title={article.title}
      btn={article.link && article.link[0] === '/'
        ? <TagNavLink to={article.link}>{article.linkText}</TagNavLink>
        : <TagLink href={`${article.link}?ref=whitelabel=page`}>{article.linkText}</TagLink>}
      content={article.content}
      art={article.art && article.art.url}
    />
  ))
}

const TagLink = styled.a`
  display: inline-block;
  background: #2cc5bd;
  border-radius: 6px;
  border: none;
  color: #fff;
  min-width: 96px;
  min-height: 18px;
  line-height: 18px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
  padding: 8px 12px;
  text-decoration: none;
  &:hover {
    color: #000;
    text-decoration: none;
  }
`
const TagNavLink = TagLink.withComponent(NavLink)


const TopicCard = ({ title, content, art, btn}) => {
  return (
    <StyledTopic>
      <div className='art'>
        <Bounce bottom>
          <img src={art} alt={title} />
        </Bounce>
      </div>
      <section>
        <Bounce bottom>
          {btn ? btn : null}
          <h3>{title}</h3>
          <Marked source={content} />
        </Bounce>
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
  
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;

  &:nth-child(even) {
    grid-template-areas: 
      "content art";
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
    > h2, > h3 {
      font-family: Clan Offc Pro Medium, sans-serif;
      font-weight: 300;
      font-size: 22px;
    }
    > p {
      font-family: Clan Offc Pro Book,sans-serif;
      font-weight: 400;
      font-size: 14px;
    }
  }
`

export default TopicsList