import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import Marked from 'react-markdown'
import { graphql } from 'react-apollo'

import UpdatedTime from 'Components/updated-time'
import GET_ARTILCES_QUERY from './get-articles.query'


export const Articles = ({data, ...props}) => {
  const quote = useMemo(() => data && data.quote, [data])
  const base = useMemo(() => data && data.base, [data])
  const mainArticle = useMemo(() => (quote && {
    title: quote.title, 
    content: quote.content, 
    createdAt: quote.createdAt,
    updatedAt: quote.updatedAt
  }), [quote])
  const subArticle = useMemo(() => (base && {
    title: base.title, 
    content: base.content, 
    createdAt: base.createdAt,
    updatedAt: base.updatedAt
  }), [base])
  
  const articles = useMemo(() => ([
    ...(quote && quote.articles) || [],
    ...(base && base.articles) || []]), [base, quote])

  return (
    <StyledArticles>
      {mainArticle && <Article {...mainArticle} />}
      {subArticle && <Article {...subArticle} />}

      {((articles && articles.length > 0) && (
        articles.map(({title, content, date, createdAt}, index) => (
          <Article key={`article-${index}`} {...{title, content, date, createdAt}} />
        ))
      ))}
    </StyledArticles>
  )
};

const Article = ({title, content, date, createdAt, updatedAt}) => {
  return (
    <StyledArticle>
      <h2>{title}</h2>
      <UpdatedTime created={date || createdAt} updated={updatedAt} />
      <Marked source={content} />
    </StyledArticle>
  )
}

const StyledArticles = styled.div`
  article {
    max-width: 580px;
    margin: 0 auto;
    &:not(:last-of-type) {
      margin-bottom: 6rem;
    }
  }
`

const StyledArticle = styled.article`
  background: #FFF;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 0px 3px 0px rgba(204, 204, 204, 0.4);
  padding: 2rem 4rem;
  > h2 {
    &:first-child {
      margin-top: 0;
    }
    + aside {
      margin-bottom: 4rem;
    }
  }

`

export { GET_ARTILCES_QUERY }
export default graphql(GET_ARTILCES_QUERY)(Articles)
