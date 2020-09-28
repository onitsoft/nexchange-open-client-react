import React from 'react';
import { I18n } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';
import styled from '@emotion/styled';
import classNames from 'classnames';
import { TagLink } from 'Components/misc/TagLink';
import { ReactTypeformEmbed } from 'react-typeform-embed';

const PriceTable = props => {
  const { plans } = props;

  if (!plans || !plans.length) return <span>Loading...</span>;

  const forder = 'monthly, duration, setup, coinlist, chatbot, devhours, hourprice, support'.split(', ');

  return (
    <I18n ns="translations">
      {(t, { lng }) => (
        <PriceContainer>
          <h2>Pricing</h2>
          <StyledTable>
            <table>
              <thead>
                <tr>
                  <th className="plans">Plans</th>
                  {plans.map(({ name }) => (
                    <th key={`plan-${name}`} className={`p p-${name}`}>
                      {t(`whitelabel.plans.${name}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {forder &&
                  forder.length &&
                  forder.map(f => (
                    <tr key={`feature-${f}`}>
                      <th className={classNames('feature', f === 'coinlist' && 'coinlist')}>{t(`whitelabel.features.${f}`)}</th>
                      {plans.map(({ [f]: feature, name }) => (
                        <td key={`feat-${f}-${name}`}>
                          {((feature || typeof feature === 'number') && t(`whitelabel.values.${f}`, { value: feature })) ||
                            (!feature && name === 'community' && 'N/A') ||
                            (!feature && '&nbsp;')}
                        </td>
                      ))}
                    </tr>
                  ))}
                {/* <tr className="pt">
                <th colSpan={plans.length + 1}>
                  <strong>Payment Terms</strong>
                </th>
              </tr>
              <tr>
                <th>
                  Total Cost First Year
                  <br />
                  <small>* 50% upfront, 50% upon delivery!</small>
                </th>
                {plans.map(plan => (
                  <td key={`plan-${plan.name}`}>{t(`whitelabel.values.total`, { value: plan.monthly * 12 + plan.setup })}</td>
                ))}
              </tr> */}
                <tr>
                  <th />
                  {plans
                    .map(plan => ({ ...plan, glink: t(`whitelabel.pricing.orderNowLink.${plan.name}`) }))
                    .map(plan => (
                      <td key={`plankl-${plan.name}`}>
                        <HashLink smooth to={`/${lng}/instant-white-label#application`}>
                          <TagLink>{t(`whitelabel.pricing.orderNowLink.${plan.name}.text`)}</TagLink>
                        </HashLink>
                      </td>
                    ))}
                </tr>
              </tbody>
            </table>
          </StyledTable>
          <h2 id="application">Whitelabel Application</h2>
          <StyledReactTypeform>
            <ReactTypeformEmbed popup={false} url="https://nexchangecc.typeform.com/to/g6x8oGrU" />
          </StyledReactTypeform>
        </PriceContainer>
      )}
    </I18n>
  );
};

const StyledReactTypeform = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  height: 400px;
  max-width: 880px;
`;

const PriceContainer = styled.div`
  padding: 2rem 0;

  > h2 {
    margin-bottom: 4rem;
  }

  #application {
    padding-top: 2rem;
  }
`;

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

  .coinlist {
    color: #2cc5bd;
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

    td:first-of-type {
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
`;

const StyledTable = styled.div`
  overflow-y: auto;

  table {
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
  }
`;

export default PriceTable;
