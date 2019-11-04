import React from 'react'
import { I18n } from 'react-i18next'
import styled from '@emotion/styled'


const PriceTable = (props) => {
  const { plans } = props

  if (!plans || !plans.length) return <span>Loading...</span>

  console.log('plans:', plans)

  const forder = 'monthly, duration, setup, coinlist, devhours, hourprice'.split(', ')

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
          {forder && forder.length && forder.map(f => (
            <tr>
              <th className='feature'>{t(`whitelabel.features.${f}`)}</th>
              {plans.map(({[f]: feature}) => (
                ((feature || typeof feature === 'number') &&
                  <td>{t(`whitelabel.values.${f}`, {value: feature})}</td>)
                ||
                (!feature &&
                  <td>&nbsp;</td>)
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
      )}
    </I18n>
  )
}

const tableStyle = `
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  text-align: center;

  img {
    width: auto;
    max-height: 40px;
  }

  th,
  tr {
    font-size: 12px;

    @media (min-width: 960px) {
      font-size: 14px;
    }

    @media (min-width: 1140px) {
      font-size: 16px;
    }
  }

  thead th {
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: 400;
  }

  td, th {
    padding: 25px 0;
    color: $black;
    background: #fff;
  }

  tbody tr {
    height: 55px;
    overflow: hidden;
    position: relative;
    border-top: 6px solid #f0f0f0;
    border-bottom: 6px solid #f0f0f0;
    -webkit-box-shadow: 0px 0px 3px 0px rgba(204, 204, 204, 0.4);
    -moz-box-shadow: 0px 0px 3px 0px rgba(204, 204, 204, 0.4);
    box-shadow: 0px 0px 3px 0px rgba(204, 204, 204, 0.4);

    td:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    td:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    img {
      max-height: 25px;
      width: auto;
      &.nexchange-logo {
        max-height: 20px;
        width: auto;
      }
      &.shapeshift-logo {
        max-height: 30px;
        width: auto;
      }
      &.changelly-logo {
        position: relative;
        top: 5px;
      }
    }

    td:last-child {
      padding: 0;
    }
  }
`

const StyledTable = styled.table`
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  ${tableStyle}
  > thead {
    > tr {
      > th {
        &:first-of-type {
          padding-left: 2rem;
        }
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
      > th {
        text-align: left;
        &:first-of-type {
          padding-left: 2rem;
        }
      }
      > td {
        > span {
          font-size: 3rem;
          color: green;
        }
      }
    }
  }
`



export default PriceTable