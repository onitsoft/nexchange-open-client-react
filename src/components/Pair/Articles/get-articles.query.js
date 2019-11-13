import gql from 'graphql-tag'

export const GET_ARTILCES_QUERY = gql`
  query GetArticles ($pagename: String) {
    pages (where: {name: $pagename}) {
      articles {
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