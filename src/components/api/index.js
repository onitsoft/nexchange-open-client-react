import { useState, useMemo, useEffect, useCallback } from 'react'
import axios from 'axios'
import config from 'Config'

export const useHistoryApi = (pair, options) => {
  const [usedPair, setUsedPair] = useState()
  const [loading, setLoading] = useState(false)
  const [historyData, setHistoryData] = useState([])

  const { params, updateInterval: updateSeconds } = options
  const updateInterval = updateSeconds * 1000

  const url = useMemo(() => `${config.API_BASE_URL}/price/${pair}/history/`, [config.API_BASE_URL, pair]);
  const liveUrl = useMemo(() => `${config.API_BASE_URL}/price/${pair}/latest/`, [config.API_BASE_URL, pair]);

  const getData = useCallback(async () => {
    setLoading(true)

    const result = await axios.get(url, { params })
    const { data } = result
    setHistoryData(data)
    setLoading(false)

    return data
  }, [url, params])

  const getLive = useCallback(async () => {
    setLoading(true)
    const result = await axios.get(liveUrl, { params: { market_code: params.market_code || 'nex' } })
    const { data } = result
    if (!result || !data || !data.length) throw new Error('Bad Live Result for "' + pair + '"')

    setHistoryData(od => {
      const [, ...oleItems] = od
      const newItems = [...oleItems, data[0]]
      return newItems
    })
    setLoading(false)

  }, [liveUrl, params])

  useEffect(() => {
    if (pair !== usedPair) {
      setHistoryData(() => {
        setUsedPair(pair)
        getData()
        return []
      })
    }
  }, [pair])

  if (updateInterval) {
    useEffect(() => {
      const iid = setInterval(() => getLive(), updateInterval)
      return () => {
        clearInterval(iid)
      }
    }, [options, pair])
  }


  return [historyData, () => getData(), loading]
}

const currencyCache = new Map()

export const useCurrencyAPI = (currency = '') => {
  const code = useMemo(() => currency.toUpperCase(), [currency])
  const [currencyData, setCurrencyData] = useState(currencyCache.get(code) || {})
  const url = useMemo(() => `${config.API_BASE_URL}/currency/${code ? code + '/' : ''}`, [config.API_BASE_URL, code]);

  const getData = useCallback(async () => {
    const result = await axios.get(url)
    const { data } = result

    return data
  }, [url])

  useEffect(() => {
    getData()
      .then(data => {
        currencyCache.set(code)
        setCurrencyData(data)
      })
  }, [currency])

  return currencyData
}