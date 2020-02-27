import React, { useMemo, useState } from 'react';

import { I18n } from 'react-i18next';
import { NavLink as Link, withRouter } from 'react-router-dom';

import styled from '@emotion/styled';
import moment from 'moment';

const COMPLIANCE = ['mastercard', 'visa'];
const COMPLIANCE2 = [
  { img: 'bestchange', url: 'https://bestchange.com', name: 'bestchange' },
  { img: 'okchanger', url: 'https://okchanger.com', name: 'okchanger' },
  { img: 'kurs', url: 'https://kurs.expert', name: 'kurs' },
  { img: 'exchangesumo', url: 'https://exchangesumo.com/', name: 'exchangesumo' },
  { img: 'emon', url: 'http://e-mon.ru/', name: 'emon' },
  { img: 'allchange', url: 'https://allchange.org/', name: 'allchange' },
  { img: 'bestcurs', url: 'https://bestcurs.org/', name: 'bestcurs' },
];

const Footer = props => {
  const { location } = props;
  const { pathname } = location;
  const hideFooter = useMemo(() => pathname === '/signin' || pathname === '/signup' || pathname === '/not-found', [location]);

  if (hideFooter) return null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <I18n ns="translations">
            {t => (
              <StyledFooter>
                <section className="logo">
                  <Link to="/">
                    <img src="/img/logo.svg" alt="N.exchange Logo" />
                  </Link>
                </section>
                <section className="links">
                  <main className="">
                    <section>
                      <h4>{t('header.resources')}</h4>
                      <ul>
                        <li>
                          <Link to="/instant-white-label">
                            <strong>{t('header.whitelabel')}</strong>
                          </Link>
                        </li>
                        <li>
                          <a href="https://nexchange2.docs.apiary.io/">{t('header.apidocumentation')}</a>
                        </li>
                        <li>
                          <a href="/#support">{t('header.support')}</a>
                        </li>
                      </ul>
                    </section>
                    <section>
                      <h4>{t('header.about')}</h4>
                      <ul>
                        <li>
                          <a href="/#about">{t('header.about')}</a>
                        </li>
                        <li>
                          <Link to="/faqs">{t('header.faq')}</Link>
                        </li>
                        <li>
                          <span />
                        </li>
                      </ul>
                    </section>
                    <section>
                      <h4>{t('footer.popular-pairs')}</h4>
                      <PopularPairs />
                    </section>
                    <section>
                      <h4>{t('header.social')}</h4>
                      <ul>
                        <li>
                          <a href="/twitter" target="_blank" rel="noopener noreferrer">
                            {t('header.twitter')}
                          </a>
                        </li>
                        <li>
                          <a href="/fb" target="_blank" rel="noopener noreferrer">
                            {t('header.facebook')}
                          </a>
                        </li>
                        <li>
                          <a href="/slack" target="_blank" rel="noopener noreferrer">
                            {t('header.slack')}
                          </a>
                        </li>
                        <li>
                          <a href="/telegram" target="_blank" rel="noopener noreferrer">
                            {t('header.telegram')}
                          </a>
                        </li>
                      </ul>
                    </section>
                  </main>
                  <aside>
                    <div className="compliance">
                      {COMPLIANCE.map(e => (
                        <img src={`/img/compliance/${e}.svg`} alt="e" className={e} key={e} />
                      ))}
                    </div>

                    <div className="compliance2">
                      {COMPLIANCE2.map(e => (
                        <a href={`${e.url}`} target="_blank" rel="noopener noreferrer" key={e.name}>
                          <img src={`/img/compliance/${e.img}.svg`} alt={`${e.name}`} className={`${e.name}`} />
                        </a>
                      ))}
                    </div>

                    <p>
                      <CopyrightNotice /> — <RegisteredCompany />
                    </p>
                    <p>
                      <Link to="/terms-and-conditions">{t('header.terms-and-conditions')}</Link>
                      <span> — </span>
                      <Link to="/privacy">{t('header.privacy-policy')}</Link>
                    </p>
                  </aside>
                </section>
              </StyledFooter>
            )}
          </I18n>
        </div>
      </div>
    </div>
  );
};
/*
ETH to BTC
BTC to ETH
LTC to ETH
USDT to BTC
BTC to XMR
BTC to USDT
*/
const defaultPairs = [
  ['eth', 'btc'],
  ['btc', 'eth'],
  ['ltc', 'eth'],
  ['usdt', 'btc'],
  ['btc', 'xmr'],
  ['btc', 'usdt'],
];
const PopularPairs = props => {
  const [pairs] = useState(defaultPairs);
  return (
    <ul>
      {pairs.map(([quote, base], index) => (
        <li key={`${quote}-to-${base}`}>
          <Link to={`/convert/${quote}-to-${base}`}>
            {quote.toUpperCase()} to {base.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const CopyrightNotice = props => <>All rights reserved, YOA LTD 2016-{moment(Date.now()).format('YYYY')} — England & Wales</>;

const RegisteredCompany = props => (
  <a href="https://beta.companieshouse.gov.uk/company/10009845" rel="noopener noreferrer" target="_blank">
    registered company No. 10009845
  </a>
);

const StyledFooter = styled.footer`
  > section {
    padding: 12px 0;
    &.logo {
      @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        margin: 0 2rem;
        width: 180px;
      }
    }
    h4 {
      text-transform: uppercase;
      font-weight: bold;
    }
    ul {
      > li {
        display: block;
        > a {
          text-transform: none;
          padding: 0;
        }
        > span {
          display: block;
          height: 2rem;
        }
      }
    }

    &.links {
      display: flex;
      flex-direction: column;
      > main {
        display: flex;
        @media screen and (max-width: 640px) {
          flex-direction: column;
        }
        > section {
          width: 180px;
          padding: 0 2rem;
          @media screen and (max-width: 640px) {
            width: 100%;
            &:not(:last-child) {
              margin-bottom: 2rem;
            }
          }
        }
      }
      > aside {
        display: flex;
        flex: 1 1 auto;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 4rem 0 0;
       
        > p {
          margin: 2rem 0 0;
          font-size: 1rem;
          text-align: center;
          a {
            text-transform: uppercase;
            color: #000;
          }
        }
        .compliance {
          display: flex;
          justify-content: center;
          align-items: center;
          
          img {
            max-width: 60px;
            display: inline-block;
            &:not(:last-child) {
              margin-right: 1rem;
            }

            &.mastercard {
              max-height: 32px;
            }
            
          }
        }
        .compliance2 {
          display: inline-block;
          
          justify-content: center;
          align-items: center;
          
          img {
            max-width: 60px;
            display: inline-block;
            margin-right: 2rem;
            &:not(:last-child) {
              margin-right: 1rem;
            }

            &.kurs {
              max-height: 23px;
            }
            
          }
        }
        }
        
          
        > ul {
          display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
          > li {
            padding: 0;
            &:not(:last-child) {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
`;

export default withRouter(Footer);
