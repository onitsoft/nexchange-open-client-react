import React from 'react'
import { I18n } from 'react-i18next'
import styled from '@emotion/styled'


const PriceTable = (props) => {
  const { plans } = props

  if (!plans || !plans.length) return <span>Loading...</span>

  const forder = 'monthly, duration, setup, coinlist, chatbot, devhours, hourprice, support'.split(', ')

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
              {plans.map(({[f]: feature, name}) => (
                ((feature || typeof feature === 'number') &&
                  <td>{t(`whitelabel.values.${f}`, {value: feature})}</td>)
                ||
                (!feature && name === 'community' &&
                  <td>N/A</td>)
                ||
                (!feature && 
                  <td>&nbsp;</td>)
              ))}
            </tr>
          ))}
          <tr className='pt'>
            <th colspan={plans.length + 1}><strong>Payment Terms</strong></th>
          </tr>
          <tr>
            <th>
              Total Cost First Year
              <br />
              <small>* 50% upfront, 50% upon delivery!</small>
            </th>
            {plans.map((plan) => (
              <td>{t(`whitelabel.values.total`, {value: (plan.monthly * 12) + plan.setup})}</td>
            ))}
          </tr>
          <tr>
            <th>
              Total Cost Second Year Onward
              <br />
              <small>* Billed monthly - deductible from fee earnings!</small>
            </th>
            {plans.map((plan) => (
              <td>{t(`whitelabel.values.total`, {value: (plan.monthly * 12) / 2})}</td>
            ))}
          </tr>
        </tbody>
      </StyledTable>
      <div>
        <TagLink href='/'>Launch Your n.exchange Now!</TagLink>
      </div>
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
  max-width: 880px;

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
    color: #000;
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

const TagLink = styled.a`
  display: inline-block;
  background: #2cc5bd;
  border-radius: 6px;
  border: none;
  color: #fff;
  min-width: 96px;
  min-height: 18px;
  line-height: 18px;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
  padding: 8px 12px;
  text-decoration: none;
  &:hover {
    color: #000;
    text-decoration: none;
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
          min-width: 110px;
          max-width: 180px;
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
