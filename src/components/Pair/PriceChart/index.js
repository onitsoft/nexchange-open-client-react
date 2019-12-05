import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import { useHistoryApi } from 'Components/api'


const PriceChart = ({pair}) => {
  const params = useMemo(() => ({
    hours: 24,
    data_points: 240,
    market_code: 'nex'
  }), [])

  const [data,, loading] = useHistoryApi(pair, {
    params,
    updateInterval: 30 // seconds
  })

  const chartOptions = useMemo(() => ({
    title: {
      text: `${pair.toUpperCase()} Price Chart`
    },
    rangeSelector : {
      enabled: false
    },
    navigator: {
      enabled: false
    },

    scrollbar: {
        enabled: false
    },
    series: [{
      data: !loading && data && data.length
        ? data.map(({ ticker: { ask, bid }, unix_time }) => [unix_time * 1000, +ask])
        : [...Array(28)] // Flatline when no data
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
    <StyledContainer>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType='stockChart'
      />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`

  border: 1px solid #f0f0f0;
  box-shadow: 0px 0px 3px 0px rgba(204, 204, 204, 0.4);

  border-radius: 6px;

`

export default PriceChart