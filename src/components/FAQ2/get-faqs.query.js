import gql from 'graphql-tag'

export const GET_WHITELABEL = gql`
  query GetFAQs ($pagename: String) {
    pages(where: {name: $pagename}) {
      title
      content
      createdAt
      updatedAt
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
    }
  }
`

export default GET_WHITELABEL
