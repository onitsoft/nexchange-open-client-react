import React, { useState, useEffect, useMemo, useCallback } from 'react'
import axios from 'axios'
import config from 'Config'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'


const PriceChart = ({pair}) => {
  const params = useMemo(() => ({
    hours: 24,
    data_points: 240,
    market_code: 'nex'
  }), [])

  const [data, update, loading] = useHistoryApi(pair, {
    params,
    updateInterval: 30 // seconds
  })

  const chartOptions = useMemo(() => ({
    series: [{
      data: data && data.length &&
        data.map(({ ticker: { ask, bid }, unix_time }) => [unix_time * 1000, +ask]),
      type: 'line',
      name: 'Ask'
    }]
  }), [data])

  if (loading) return <>Loading...</>
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType='stockChart'
      />
    </>
  )
}

const useHistoryApi = (pair, options) => {
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
    const result = await axios.get(liveUrl, { params: { market_code: params.market_code || 'nex' } })
    const { data } = result
    if (!result || !data || !data.length) throw new Error('Bad Live Result for "' + pair + '"')

    setHistoryData(od => {
      const [, ...oleItems] = od
      const newItems = [...oleItems, data[0]]
      return newItems
    })
  }, [liveUrl, params])

  useEffect(() => {
    getData()
  }, [])

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

export default PriceChart