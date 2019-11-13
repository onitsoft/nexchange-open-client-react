import React, { useState, useMemo, useEffect } from 'react'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import i18n from 'i18next'

import Config from '../config'

const { GRAPHCMS_API } = Config

const Provider = ({ children }) => {
  const [lang, setLang] = useState('en')
  
  const cache = useMemo(() => new InMemoryCache(), [])
  
  const client = useMemo(() => {
    const cln = new ApolloClient({
      link: new HttpLink({
        uri: GRAPHCMS_API,
        headers: {
          locale: lang.toUpperCase()
        }
      }),
      cache
    })
    return cln
  }, [lang])
  
  useEffect(() => i18n.on('languageChanged', lng => {
    setLang(lng)
    cache.reset()
  }), [])

  return <ApolloProvider {...{children, client}} />
}

export default Provider
