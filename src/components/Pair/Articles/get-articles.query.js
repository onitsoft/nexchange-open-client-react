import gql from 'graphql-tag'

export const GET_ARTILCES_QUERY = gql`
  query GetArticles ($baseName: String, $quoteName: String) {
    base: page (where: {name: $baseName}) {
      title
      content
      createdAt
      updatedAt
      articles (orderBy: sort_ASC) {
        title
        content
        date
        createdAt
        updatedAt
      }
    }
    quote: page (where: {name: $quoteName}) {
      title
      content
      createdAt
      updatedAt
      articles (orderBy: sort_ASC) {
        title
        content
        date
        createdAt
        updatedAt
      }
    }
  }
`

export default GET_ARTILCES_QUERY