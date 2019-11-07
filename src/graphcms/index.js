import React from 'react'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import Config from '../config'

const { GRAPHCMS_API } = Config

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
})

const Provider = ({ children }) => <ApolloProvider {...{children, client}} />

export default Provider
