import React, { useState, useEffect, useMemo, useCallback } from 'react'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import { useHistoryApi } from 'Components/api'


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
    rangeSelector : {
      enabled: false
    },
    navigator: {
      // enabled: false
    },
    series: [{
      data: !loading && data && data.length
        ? data.map(({ ticker: { ask, bid }, unix_time }) => [unix_time * 1000, +ask])
        : [...Array(24)] // Flatline when no data
            .map((a, b) => ([Date.now() - (b * 1000 * 60 * 60), 0, 0]))
            .sort(([a], [b]) => a > b ? 1 : -1),
      type: 'area',
      name: pair,
      color: '#2cc5bd',
      tooltip: {
        valueDecimals: 2
      },
      fillColor: {
          linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
          },
          stops: [
              [0, '#2cc5bd'],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
      },
    threshold: null
    }]
  }), [data, loading])

  // if (loading) return <>Loading...</>
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

export default PriceChart