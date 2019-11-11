import React, { useMemo } from 'react'
import moment from 'moment'

import Marked from 'react-markdown'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'


export const Articles = ({data, ...props}) => {
  const page = useMemo(() => data && data.pages && data.pages[0], [data])
  const articles = useMemo(() => page && page.articles, [page])

  return (
    <div className="container">
      {((articles && articles.length > 0) && (
        articles.map(({title, content, date, createdAt}, index) => (
          <div key={`article-${index}`} ackaclassName="row">
            <div className="col-xs-12">
              <Article {...{title, content, date, createdAt}} />
            </div>
          </div>
        ))
      )) || (
        <small>No articles for pagename <code>{props.pagename}</code></small>
      )}
    </div>
  )
};

const Article = ({title, content, date, createdAt}) => {
  const timeof = useMemo(() => moment(date || createdAt).format('ddd MMM dd YYYY'), [date, createdAt])
  return (
    <article>
      <h2>{title}</h2>
      <aside><small>on <date datetime={date || createdAt}>{timeof}</date></small></aside>
      <Marked source={content} />
    </article>
  )
}

export const GET_ARTILCES_QUERY = gql`
  query GetArticles ($pagename: String) {
    pages (where: {name: $pagename}) {
      articles {
        title
        content
        date
        createdAt
      }
    }
  }
`

export default graphql(GET_ARTILCES_QUERY)(Articles)
