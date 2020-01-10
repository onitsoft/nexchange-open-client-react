import gql from 'graphql-tag'

export const GET_WHITELABEL = gql`
  query GetWhitelabel ($pagename: String) {
    pages(where: {name: $pagename}) {
      title
      videoId: content
      createdAt
      updatedAt
      topics: articles (orderBy: sort_ASC) {
        title
        content
        date
        createdAt
        link
        linkText
        art {
          fileName
          url
        }
      }
      main {
        title
        content
        art {
          fileName
          url
        }
      }
      faq (orderBy: sort_ASC) {
        id
        title
        content
        link
        linkText
      }
      features {
        title
        content
        link
        linkText
        art {
          fileName
          url
        }
      }
    }
  }
`

export default GET_WHITELABEL
