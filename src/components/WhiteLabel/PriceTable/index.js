import React, { useEffect, useState } from 'react'
import { I18n } from 'react-i18next'
import styled from '@emotion/styled'


const PriceTable = (props) => {
  const { plans } = props

  if (!plans || !plans.length) return <span>Loading...</span>

  return (
    <I18n ns="translations">
      {t => (
    <>
      <h2>Pricing</h2>
      <StyledTable>
        <thead>
          <tr>
            <th className='plans'>Plans</th>
            {plans.map(({name}) => <th key={`plan-${name}`} className={`p p-${name}`}>{t(`whitelabel.plans.${name}`)}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='feature'>Custom Domain</td>
            <td><span>✔</span></td>
            <td><span>✔</span></td>
            <td><span>✔</span></td>
            <td><span>✔</span></td>
          </tr>
        </tbody>
      </StyledTable>
    </>
      )}
    </I18n>
  )
}

const StyledTable = styled.table`
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  > thead {
    > tr {
      > th {
        &.plans {
          text-align: left;
        }
        &.p {
          width: 110px;
          &-community {

          }
        }
      }
    }
  }
  > tbody {
    > tr {
      > td {
        &.feature {
          text-align: left;
        }
        &:not(.feature) {
          > span {
            font-size: 3rem;
            color: green;
          }
        }
      }
    }
  }
`

export default PriceTable
